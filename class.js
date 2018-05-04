//Goodluck!

//All necessery imports
const request = require('sync-request');
const querystring = require('querystring');
const color = require('chalk'); //for debug
const assert = require('assert').equal; //for debug
//const fs = require('fs-sync'); //WARNING:for debug only!
//error class (for api)
class KorError{
  constructor(arg){
    console.warn(color.bold.red("Error:KorError"));
  }
}

//for debug
var red=arg=>{console.log(color.bold.red(arg))};
var green=arg=>{console.log(color.bold.green(arg))};

const nick="tirzon";

class Api{
    constructor(){
        this.cookie={
            last_logged_user_customer_id:'', //editable
            __utma:'133173652.540521041.1516119582.1516119582.1516119582.1',
            __utmz:'133173652.1516119582.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
            _ym_uid:'1516119582257435681', //const
            sbsid:'', //editable
            tzo:-3 //const
        }
        this.cookie=this.create_cookie(this.cookie);
        this.baseurl='http://' + nick + '.kor.ru/';
        green(this.cookie);
    }
    req(method="POST",url="http://kor.ru/login/"){
        var headers={
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            //'Content-Length':, //automatic set
            'Content-Type':'application/x-www-form-urlencoded',
            'Cookie':this.cookie,
            'Host':'www.kor.ru',
            'Pragma':'no-cache',
            'Refer':'http://www.kor.ru',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0'
        }
        //TODO! save options for using in sendMood test
        this.options={
            headers:headers,
            //body:body, //querystring body
            followAllRedirects:false
        }
        var r=request('POST',url,this.options)
        assert(r.url,this.baseurl) //auth nick test
    }
    sendPost(message){
        var options=Object.assign({},this.options); //copy of this.options
        //var url=`http://${nick}.kor.ru/blog/add/ajax_mood/`;
        var url=`http://${nick}.kor.ru/blog/add/ajax_text/`;
        //var body={mood:mood};
        var body={
            // mood:"Нет настроения совсем у меня"
            comments_idea:0, //0 это разрешено,1 это запрет
            message_id:0, //new post
            message:"text", //text
            subj:"a", //header
            who_idea:2, //[all,friends,me]
            tags:"" //tags
        };
        var body=querystring.stringify(body);
        options['body']=body;
        options['headers']['Refer']=`http://${nick}.kor.ru/`;
        options['headers']['Host']=`${nick}.kor.ru`;
        //options['headers']['Content-Length']=Buffer.byteLength(body);
        options['headers']['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        options['headers']['X-Requested-With']='XMLHttpRequest';
        console.log(body);
        var r=request('POST',url,options);
        console.log(r)
        //console.log(r.body.toString('utf-8'));
    }
    create_cookie(cookie){
        var tmp="";
        for(let i in cookie) tmp+=`${i}=${cookie[i]}; `;
        return tmp.slice(0,-2); //delete the last ;\s
    }
}
var test = new Api();
test.req() //auth
test.sendPost("Hello!")

