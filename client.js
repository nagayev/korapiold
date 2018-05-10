var {korapi} = require('./class.js');
var input = require('readline-sync').question; //консольный ввод
var welcome = 'Welcome to kor console client\nTap help to help';
var help = 'help-show help\nexit-exit\nmood-send mood\npost-send post\ndel post - delete post\ndel mood-delete mood\n';
help+="del album - delete photoalbum\nadd fav-add post to favourite\ndel fav-delete from favourites";
var err = 'Command not found\n Use help to help';
console.log(welcome);

var api = new korapi();

while(true){
    var inp=input("Type your command:> ");
    if(inp=="help") console.log(help);
    else if(inp=="exit" || inp==".exit") break;
    else if(inp=="mood"){
        let mood = input("Enter mood> ");
        api.sendMood(mood);
    }
    else if(inp=="del mood") api.deleteMood();
    else if(inp=="post"){
        let body = {};
        body.subj=input("Enter subject> "); 
        body.message=input("Enter post message> ");
        body.tags=input("Enter the tags> ");
        body.comments_idea=input("0-Comments id enable,1-comments is disable ");
        body.who_idea=input("Post for All(0),friends(1),me(2) ")
        api.sendPost(body);
    }
    else if(inp=="del post"){
        let id=input("Enter the post id> ");
        api.deletePost(id);
    }
    else if(inp=="del album"){
        let id=input("Enter the album id> ");
        api.deletePhotoAlbum(id);
    }
    else if(inp=="add fav"){
        let id=input("Enter the post id> ");
        api.addtoFavourites(id);
    }
    else if(inp=="del fav"){
        let id=input("Enter the post id> ");
        api.deletefromFavourites(id);
    }
    else console.log(err);
}
