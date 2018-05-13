/*
Project:korapi
Homepage:https://github.com/nagayev/korapi
Programmer:nagayev
License:see License file
Description:
Tests for korapi
*/
var {korapi} = require('./new.js');
var color = require('chalk').bold;
const debug=1;

var warn=message=>console.log(color.yellow(message));
var err=message=>console.log(color.red(message));
var note=message=>console.log(color.green(message));

var api = new korapi();
if(debug){
    note("Debug mode:on");
}
var details={
    additional:"Тут ничего нет",
    birthday_day:0,
    birthday_month:0,
    birthday_year:0000,
    city:"Флоринг",
    motto:'', //девиз
    name:''
};
api.req();
/*
api.sendPost("Hello!");
api.sendMood("Mood");
api.sendFriendRequest("demfarbar",5078762);
api.deletePhotoAlbum(1);
api.deletePost(2807800);
api.deleteMood();
*/
//api.saveDetails(details); //not working yet
