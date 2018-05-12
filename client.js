var {korapi} = require('./class.js');

var input = require('readline-sync').question; //консольный ввод

var welcome = 'Welcome to kor console client\n\
Tap help to get help';

var help = 'help - show help\n\
exit - exit\n\
set mood - send mood\n\
delete mood - delete mood\n\
new post - send post\n\
delete post - delete post\n\
delete album - delete photoalbum\n\
add favourite - add post to favourite\n\
delete favourite - delete post from favourites\n\
clear - clear screen\n\
';

var errorMassage = 'Command not found\n\
Use help to get help';

console.log(welcome);

var API = new korapi();
var consoleAPILaunched = true;

while (consoleAPILaunched)
{
    var inputString = input("Type your command:> ");

    if (inputString == "help") 
    {
        console.log(help);
    }
    else if (inputString == "exit" || inputString == ".exit")
    {
        consoleAPILaunched = false;
    }
    else if (inputString == "set mood")
    {
        let new_mood = input("Enter new mod:> ");
        API.sendMood(new_mood);
    }
    else if (inputString == "delete mood")
    {
        API.deleteMood();
    }
    else if (inputString == "new post")
    {
        let newPost = {};
        newPost.subj = input_string("Enter subject:> "); 
        newPost.message = input_string("Enter post message:> ");
        newPost.tags = input_string("Enter the tags:> ");
        newPost.comments_idea = input_string("0-Comments is enable, 1-comments is disable ");
        newPost.who_idea = input_string("Post for All (0), friends (1), me (2):> ")
        API.sendPost(newPost);
    }
    else if (inputString == "delete post")
    {
        let ID = input("Enter the post ID:> ");
        API.deletePost(ID);
    }
    else if (inputString == "delete album")
    {
        let ID = input_string("Enter the album ID:> ");
        API.deletePhotoAlbum(ID);
    }
    else if (inputString == "add favourite")
    {
        let ID = input_string("Enter the post ID:> ");
        API.addtoFavourites(ID);
    }
    else if (inputString == "delete favourite")
    {
        let ID = input_string("Enter the post ID:> ");
        API.deletefromFavourites(ID);
    }
    else if (inputString == "clear")
    {
        console.log("\u001B[2J\u001B[0;0f")
    }
    else
    {
        console.log(errorMassage);
    }
    console.log("\n");
}

// Изменил код стайл. Просто планирую дальше этим файлом заниматься
// Изменил имена переменных - на будущее поменять надо все на читаемые и понятные, без сокращений. Не меняю твой стиль названия переменных, но лучше сделать API
// в целом как и ID и другие сложные сокращения.
// Исправил английский язык - были небольшие ошибки. Я сам не особо умный и обычно переводчик использую, но там явные были.