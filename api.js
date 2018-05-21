/*
Project:korapi
Homepage:https://github.com/nagayev/korapi
Programmers:nagayev
License:see License file
Description:
The main file with api class KorApi
*/

//All necessery imports
const request = require('sync-request');
const querystring = require('querystring');
const color = require('chalk'); //for debug
const assert = require('assert').equal; //for debug
const fs = require('fs-sync'); //for read cookie file
//for debug
var error=arg=>console.log(color.bold.red("ERROR:" + arg));
var normal=arg=>console.log(color.bold.green(arg));
var warn=arg=>console.log(color.bold.yellow("WARNING:" + arg));

var nick="tirzon"; //можно const

class KorApi{
    constructor(){
        this.cookie=JSON.parse(fs.read('cookie.json'));
        this.cookie.tzo=new Date().getTimezoneOffset()/60; //устанавливаем нужную зону
        this.cookie=this.create_cookie(this.cookie);
        this.baseurl='http://' + nick + '.kor.ru/';
        this.login='email@server.com';
        this.password='password';
    }
    req(method="POST",url="http://kor.ru/login/",body=null,header={}){
        var stdheaders={
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
        var headers=Object.assign({},stdheaders,header);
        var options={
            headers:headers,
            //body:body, //querystring body
            followAllRedirects:false
        }
        if(body!=null) options.body=querystring.stringify(body); //if body exists,add body
        var r=request(method,url,options);
        return r;
    }
    auth(){
        var url='http://www.kor.ru/login/'
        var r=this.req();
        var sbsid=this.unzip_cookie(r.headers['set-cookie'][0]).sbsid;
        console.log(r.headers);
        console.log('Sbsid:',sbsid);
        //assert(sbsid!=undefined);
        var body={
            login:this.login,
            password:this.password,
            return_url:''
        };
        console.log('Body: ',body);
        var cookie=this.create_cookie({sbsid:sbsid})
        console.log(cookie);
        var headers={
            'Cookie':cookie,
            'Pragma':undefined,
            'Cache-Control':undefined
        }
        var r=this.req('POST',url,body,headers);
        console.log(r.headers);
    }
    assert(){
        let url = this.req().url;
        return assert(url,this.baseurl);
    }
    sendPost(obj){
        var url=`http://${nick}.kor.ru/blog/add/ajax_text/`;
        /*
        var body={
            comments_idea:0, //0 это разрешено,1 это запрет
            message_id:0, //new post
            message:message, //text
            subj:"a", //header
            who_idea:2, //[all,friends,me]
            tags:"" //tags
        };
        */
        obj.message_id=0;
        var headers={};
        headers['Refer']=`http://${nick}.kor.ru/`;
        headers['Host']=`${nick}.kor.ru`;
        //options['headers']['Content-Length']=Buffer.byteLength(body);
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        headers['X-Requested-With']='XMLHttpRequest';
        console.log(body);
        var r=this.req('POST',url,body,headers);
        console.log(r.body.toString('utf-8'));
        return r;
    }
    deletePost(id){
        var url = `http://${nick}.kor.ru/blog/delete/${id}`;
        var headers={};
        headers['Refer']=`http://${nick}.kor.ru/`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var body = null; //no body
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        //баг на стороне кора:ok даже если поста уже нет
        if(r_body.indexOf('ok') == -1) warn("Error in deletePost");
        console.log(r_body);
        return r;
    }
    sendMood(mood){
        var url = `http://${nick}.kor.ru/blog/add/ajax_mood/`;
        var body = {mood:mood};
        var headers={};
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        headers['Refer']=`http://${nick}.kor.ru/`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('POST',url,body,headers);
        console.log(r.body.toString('utf-8'));
        return r;
    }
    deleteMood(){
        var url = `http://${nick}.kor.ru/blog/delete/ajax_mood/`;
        var body = {mood:''};
        var headers={};
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        headers['Refer']=`http://${nick}.kor.ru/`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('POST',url,body,headers);
        console.log(r.body.toString('utf-8'));
        return r;
    }
    sendFriendRequest(user,user_id){
        var url = `http://${user}.kor.ru/relationship/add_friend_request/`;
        var body = {'to_user':user_id};
        var headers={};
        headers['Refer']=`http://${user}.kor.ru/`;
        headers['Host']=`${user}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        if(r_body.indexOf('error')>-1) warn("Error in friend request");
        return r;
    }
    deletePhotoAlbum(id){
        var url = `http://${nick}.kor.ru/photoalbums/delete_album/?album_id=${id}`;
        var headers = {};
        headers['Refer']=`http://${nick}.kor.ru/photoalbums/`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var body = null;
        var r = this.req('GET',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        if(r_body.indexOf('error')>-1) warn("Error in deletePhotoAlbum");
        return r;
    }
    addtoFavourites(post_id){
        var _ = +new Date; //time(milliseconds)
        var url = `http://${nick}.kor.ru/blog/add_to_favourites/?message_id=${post_id}&_=${_}`;
        var body = null;
        var headers={};
        headers['Refer']=`http://${nick}.kor.ru/blog/my_favourites/p1`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('GET',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    deletefromFavourites(post_id){
        var _ = +new Date; //time(milliseconds)
        var url = `http://${nick}.kor.ru/blog/remove_from_favourites/?message_id=${post_id}&_=${_}`;
        var body = null;
        var headers={};
        headers['Refer']=`http://${nick}.kor.ru/blog/my_favourites/p1`;
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('GET',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    addComment(message,post_id){
        var url = `http://${nick}.kor.ru/newspaper/add_comment/`;
        var body = {
            comment_id:0, //new
            comment_message:message,
            in_reply:0,
            postd_id:post_id //post с новостями
        };
        var r = this.req('POST',url,body,headers); 
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;       
    }
    voteComment(id,val){
        //value is minus/plus
        if(val!="minus" || val !="plus") throw new ValueError("Invalid value");
        var _ = +new Date;
        var url = `http://${nick}.kor.ru/blog/comments/vote/?comment_id=${id}&value=${val}&_=${_}`;
        var body = null;
        var headers={};
        headers['Refer']=`http://${nick}.kor.ru/newspaper/256`; //FIXME: Invalid Refer
        headers['Host']=`${nick}.kor.ru`;
        headers['X-Requested-With']='XMLHttpRequest';
        var r = this.req('GET',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    postComment(message,post_id){
        var url = `http://${nick}.kor.ru/blog/add/comment/`;
        var body = {
            comment_id:0,
            comment_message:message,
            in_reply:0,
            post_id:post_id
        };
        var headers={};
        headers['Host']=`${nick}.kor.ru`;
        headers['Referer']=`${nick}.kor.ru/blog/comments/${post_id}`;
        var r = this.req('GET',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    sendGift(comment,gift_id,user,user_id){
        var url = `http://${user}.kor.ru/gifts/send/`;
        var body={
            comment:comment,
            gift_id:gift_id,
            to_user:user_id
        };
        var headers={};
        headers['Host']=`${user}.kor.ru`;
        headers['Referer']=`${user}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    saveDetails(body){
        //FIXME: Error 
        var url = `http://${nick}.kor.ru/save_details/`;
        var headers={};
        headers['Accept']='application/xml, text/xml, */*; q=0.01';
        headers['Host']=`${nick}.kor.ru`;
        headers['Referer']=`http://${nick}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    mute(user,user_id){
        var url = `http://${user}.kor.ru/relationship/add_to_ignore/`;
        var headers={};
        headers['Accept']='application/xml, text/xml, */*; q=0.01';
        headers['Host']=`${user}.kor.ru`;
        headers['Referer']=`http://${user}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var body = {
            to_user:user_id
        };
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    unmute(user,user_id){
        var url = `http://${user}.kor.ru/relationship/unignore/`;
        var headers={};
        headers['Accept']='application/xml, text/xml, */*; q=0.01';
        headers['Host']=`${user}.kor.ru`;
        headers['Referer']=`http://${user}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var body = {
            to_user:user_id
        };
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;
    }
    addtoEnemie(user,user_id){
        var url = `http://${user}.kor.ru/relationship/add_to_enemies/`;
        var headers={};
        headers['Accept']='application/xml, text/xml, */*; q=0.01';
        headers['Host']=`${user}.kor.ru`;
        headers['Referer']=`http://${user}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var body = {
            enemy_id:user_id
        };
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;   
    }
    deletefromEnemie(user,user_id){
        var url = `http://${user}.kor.ru/relationship/remove_from_enemies/`;
        var headers={};
        headers['Accept']='application/xml, text/xml, */*; q=0.01';
        headers['Host']=`${user}.kor.ru`;
        headers['Referer']=`http://${user}.kor.ru/`;
        headers['X-Requested-With']='XMLHttpRequest';
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
        var body = {
            enemy_id:user_id
        };
        var r = this.req('POST',url,body,headers);
        var r_body = r.body.toString('utf-8');
        console.log(r_body);
        return r;   
    }
    create_cookie(cookie){
        if(typeof cookie!='object') throw new TypeError;
        var tmp="";
        for(let i in cookie) tmp+=`${i}=${cookie[i]}; `;
        return tmp.slice(0,-2); //delete the last '; '
    }
    unzip_cookie(cookie){
        if(typeof cookie!='string') throw new TypeError;
        var ret={};
        var tmp=cookie.split('; ') //['sbsid=lala','Domain=.kor.ru',...]
        for(let i=0;i<tmp.length;i++){
            var temp=tmp[i].split('=');
            ret[temp[0]]=temp[1];
        }
        return ret;
    }
}
exports.korapi=KorApi; 
