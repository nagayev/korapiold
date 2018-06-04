/*
Project:korapi
Homepage:https://github.com/nagayev/korapi
Programmers:nagayev,peytob
License:see License file
Description:
Console client.
Use api in api.js 
*/
(async()=>{
    //тут код клиента
    var {korapi,build} = require('./api.js');
    var color = require('chalk');
    const client_build = 4;

    if(build<client_build) console.log(color.bold.red("WARN:Old Api detecked! Plz update api \033[91m"));
    else if(build>client_build) console.log(color.bold.red('WARN:Old client! Plz update client'));

    function input(message) {
        return new Promise((resolve, reject) => {
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            let input_string = '';
            console.log(message);
            process.stdin.on('data', function(chunk) {
              input_string += chunk;
              process.stdin.pause();
              resolve(input_string);
            });
        });
    }
var welcome = 'Welcome to kor console client\n\
Tap help to get help';

var help = 'help - show help\n\
login - login in the game\n\
exit - exit\n\
set mood - send mood\n\
delete mood - delete mood\n\
new post - send post\n\
delete post - delete post\n\
delete album - delete photoalbum\n\
add favourite - add post to favourite\n\
delete favourite - delete post from favourites\n\
clear - clear screen\n\
add friend - add a friend by his nickname and ID\n\
ban - add a enemy \n\
unban - unban smb \n\
get mobs - list of mobs \n';

var errorMassage = 'Command not found\n\
Use help to get help';

console.log(welcome);

var API = new korapi();
var consoleAPILaunched = true;

String.prototype.trim=function(){
    return this.replace(/^\s+|\s+$/g,"");
}

while (consoleAPILaunched)
{
    var inputString = await input("Type your command:> ");
    var inputString = inputString.trim(); //удаляем всякий хлам из ввода типа \n
    if (inputString == "help" || inputString == "помощь") 
    {
        console.log(help);
    }
    else if (inputString == "exit" || inputString == "выход")
    {
        consoleAPILaunched = false;
    }
    else if (inputString == "set mood" || inputString == "задать настроение")
    {
        let new_mood = await input("Enter new mood:> ");
        API.sendMood(new_mood);
    }
    else if (inputString == "delete mood" || inputString == "удалить настроение")
    {
        API.deleteMood();
    }
    else if (inputString == "new post" || inputString == "новый пост")
    {
        let newPost = {};
        newPost.subj = await input("Enter subject:> "); 
        newPost.message = await input("Enter post message:> ");
        newPost.tags = await input("Enter the tags:> ");
        newPost.comments_idea = await input("0-Comments is enable, 1-comments is disable ");
        newPost.who_idea = await input("Post for All (0), friends (1), me (2):> ")
        API.sendPost(newPost);
    }
    else if (inputString == "delete post" || inputString == "удалить пост")
    {
        let ID = await input("Enter the post ID:> ");
        API.deletePost(ID);
    }
    else if (inputString == "delete album" || inputString == "удалить альбом")
    {
        let ID = await input("Enter the album ID:> ");
        API.deletePhotoAlbum(ID);
    }
    else if (inputString == "add favourite")
    {
        let ID = await input("Enter the post ID:> ");
        API.addtoFavourites(ID);
    }
    else if (inputString == "delete favourite")
    {
        let ID = await input("Enter the post ID:> ");
        API.deletefromFavourites(ID);
    }
    else if (inputString == "clear" || inputString == "cls" || inputString == "очистить")
    {
        console.log("\u001B[2J\u001B[0;0f")
    }
    else if (inputString == "add friend")
    {
        let nickname = await input("Enter the user nickname:> ");
        let ID = await input("Enter the user ID:> ");
        API.sendFriendRequest(nickname, ID);
    }
    else if (inputString == "login")
    {
        let username = await input("Enter the username or e-mail:> ");
        let password = await input("Enter the password:> ");
        // login
        //FIXME: NOT_IMPLEMENTED_YET
    }
    else if (inputString == "ban")
    {
        let nickname = await input("Enter the user nickname:> ");
        let ID = await input("Enter the user ID:> ");
        API.addtoEnemie(nickname,ID);  
    }
    else if (inputString == "unban")
    {
        let nickname = await input("Enter the user nickname:> ");
        let ID = await input("Enter the user ID:> ");
        API.deletefromEnemie(nickname,ID);  
    }
    else if (inputString == "get mobs")
    {
        let nickname = await input("Enter the user nickname:> ");
        nicname=nickname.trim();
        nickname=nickname.replace(/\W+\s/g,''); 
        let content = API.getMobs(nickname);
        for(i=0;content.length;i++)
        {
            console.log("Name:",content[i].name);
            console.log("Number:",content[i].count);
            console.log("Level:",content[i].lvl);
            //console.log("Image:",content[i].img); //ссылка на изображение
            console.log('\n');
        }
    }
    else
    {
        console.log(errorMassage);
    }
}
})();
