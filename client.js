(async()=>{
    //тут код клиента
    var {korapi} = require('./class.js');

    function input(message) {
        return new Promise((resolve, reject) => {
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            let input_string = '';
            console.log(message);
            process.stdin.on('data', function(chunk) {
              input_string += chunk;
              //НЕ ЭМИТИТЬ END
              process.stdin.pause();
              resolve(input_string);
            });
             
            process.stdin.on('end', function() {
                //конец stdin,инпуту пипец.не эмить!
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
add friend - add a friend by his nickname and ID\n';

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
        sendFriendRequest(nickname, ID);
    }
    else if (inputString = "login")
    {
        let username = await input("Enter the username or e-mail:> ");
        let password = await input("Enter the password:> ");
        // login
    }
    else
    {
        console.log(errorMassage);
    }
}
})();
