var rp = require('request-promise');
var fs = require('fs-sync');
// var querystring = require('querystring');
const test=1; //режим тестирования настроения
var mood="mood"; //новое настроение
//заполни куки
var cookie={
  last_logged_user_customer_id:'', //not const
  __utma:'',
  __utmz:'',
  _ym_uid:'1516119582257435681',
  sbsid:'', //not const
  tzo:-3
}
tmp="";
for(i in cookie) tmp+=`${i}=${cookie[i]}; `;
var cookie = tmp.slice(0,-2); //delete the last ;\s
delete tmp;
console.log("Кука:" + cookie);
var options = {
    method: 'POST',
    uri:'http://kor.ru/login/',
    formData: {
        // Like <input type="text" name="name">
        login: 'login',
        password: 'parol',
        return_url: '',
    },
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding':'gzip, deflate',
      'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive',
      //'Content-Length':Buffer.byteLength("mood=mood2"), //automatic set,defaul 56
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
  //поправь ник
  var mood="mood=" + mood;
  options['uri']='http://tirzon.kor.ru/blog/add/ajax_mood/';
  options['body']=mood;
  options['headers']['Refer']='http://tirzon.kor.ru/';
  options['headers']['Host']='tirzon.kor.ru';
  options['headers']['Content-Length']=Buffer.byteLength(mood);
  options['headers']['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
  options['headers']['X-Requested-With']='XMLHttpRequest';
  options['formData']="" //
}
rp(options)
    .then( (response) => {
        // POST succeeded...
        const headers = response.headers;
        const location = headers.location;
        try{
        var nick = location.slice(0,location.indexOf('.')).replace('http://','');
        if(nick===undefined) throw SyntaxError
         }
        catch(e){
          console.log("no location in headers")
        }
        console.log(response.body);
        console.log(response.statusCode);
        console.log(response.headers);
        // console.log(nick);
        var json = {};
        json.location=location;
        json['set-cookie']=headers['set-cookie'];
        json=JSON.stringify(json);
        fs.write('config.json',json);
    })
    .catch( (err) => {
        // POST failed...
        console.error('Error in request' + err);
    });
