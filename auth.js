var rp = require('request-promise');
var querystring = require('querystring');
var color = require('chalk');

const test=1;

const mood=""; //твое настроение
const nick=""; //твой ник

class KORERROR{
  constructor(arg){
    console.error(arg);
  }
}
var cookie={
  last_logged_user_customer_id:'', //editable
  __utma:'133173652.540521041.1516119582.1516119582.1516119582.1',
  __utmz:'133173652.1516119582.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
  _ym_uid:'1516119582257435681', //const
  sbsid:'', //editable
  tzo:-3 //const
}
var create_cookie=(cookie)=>{
  var tmp="";
  for(i in cookie) tmp+=`${i}=${cookie[i]}; `;
  var cookie = tmp.slice(0,-2); //delete the last ;\s
  return cookie;
}
var cookie=create_cookie(cookie);
console.log("Кука: \n" + cookie);
var options = {
    method: 'POST',
    uri:'http://kor.ru/login/',
    formData: {
        // Like <input type="text" name="name">
        login: 'login',
        password: 'password',
        return_url: ''
    },
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding':'gzip, deflate',
      'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive',
      //'Content-Length':, //automatic set
      'Content-Type':'application/x-www-form-urlencoded',
      'Cookie':cookie,
      'Host':'www.kor.ru',
      'Pragma':'no-cache',
      'Refer':'http://www.kor.ru',
      'Upgrade-Insecure-Requests':'1',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0'
    },
    resolveWithFullResponse: true,
    //followAllRedirects:true,
    simple:false
};
if(test){
  //тестируем отправку настроения
  let body=querystring.stringify({mood:mood}); //превращаем настроение в строку запроса
  options['uri']=`http://${nick}.kor.ru/blog/add/ajax_mood/`;
  options['body']=body;
  options['headers']['Refer']=`http://${nick}.kor.ru/`;
  options['headers']['Host']=`${nick}.kor.ru`;
  options['headers']['Content-Length']=Buffer.byteLength(body);
  options['headers']['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
  options['headers']['X-Requested-With']='XMLHttpRequest';
  options['formData']=""
}
rp(options)
    .then( (response) => {
        // успешный POST запрос
        /*
        const headers = response.headers;
        const location = headers.location;
        try{
        var nick = location.slice(0,location.indexOf('.')).replace('http://','');
        if(nick===undefined) throw SyntaxError
         }
        catch(e){
          console.log("no location in headers")
        }
        */
        if(response.statusCode>=500) throw KORERROR("Invalid")
        console.log(color.bold.green('Status code: ') + response.statusCode);
        console.log(color.bold.green('Body:\n') + response.body);
        console.log(color.bold.green('Headers:\n'), response.headers);
    })
    .catch( (err) => {
        // POST запрос прошел с фатальной ошибкой
        console.error(color.bold.red('Error in request: ') + err);
    });
