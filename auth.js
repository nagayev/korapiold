/*
Инструкция по авторизации:
Взять куку кора из твоего браузера
и подставить её в 'Cookie'
подставить логин и пароль
Скачать и установить Nodejs
открыть cmd/powershell в папке с этим файлом
и набрать
node test
если файл был переменован,то test меняешь на название файла
*/
var rp = require('request-promise');
var options = {
    method: 'POST',
    uri: 'http://kor.ru/login/',
    formData: {
        // Like <input type="text" name="name">
        login: 'login@gmail.com',
        password: 'your_password',
        return_url: ''
    },
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding':'gzip, deflate',
      'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive',
      // 'Content-Length':'56', //automatic set
      'Content-Type':'application/x-www-form-urlencoded',
      'Cookie':'your_cookie',
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

rp(options)
    .then(function (response) {
        // POST succeeded...
        const location = response.headers.location;
        var nick = location.slice(0,location.indexOf('.')).replace('http://','');
        console.log(response.body);
        console.log(response.statusCode);
        console.log(response.headers);
        console.log(nick);
    })
    .catch(function (err) {
        // POST failed...
        console.error('Error in request' + err);
    });
