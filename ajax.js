user=REGISTRY.user_id;
user=(user-2).toString();
$.ajax({
				type : 'POST',
				url : '/relationship/add_friend_request/',
				data : {
					to_user : user.toString()
				},
				dataType : 'xml', success:(xml)=>{a=xml}
        });
/*
for(i=user;i>2;i--){
console.log('i');
$.ajax({
       type : 'POST',
       url : '/relationship/add_friend_request/',
       data : {
         to_user : i.toString()
       },
       dataType : 'xml',
       success:(xml)=>{a=xml},
       error:()=>{console.log('err')}
        });
}
*/
flag=true;
i=4;
while(flag){
$.ajax({
       type : 'POST',
       url : '/relationship/add_friend_request/',
       data : {
         to_user : i.toString()
       },
       dataType : 'xml',
       success:(xml)=>{a=xml},
       error:()=>{console.log('err')}
        });
        if(a.lastElementChild.outerHTML!='<new_post><error type="same race"/></new_post>'){
         flag=false;
         console.log(i)
        }
        console.log('no');
        i++;
}
$.ajax({
	type:"GET",
	url:'/relationship/remove_from_friends/',
	datatype:'xml',
	cache:false,
	data:{
		friend_id:"5235674"
	},
	success:(xml)=>{
		alert(xml.lastElementChild.outerHTML);
	}
});
$.ajax({
	type:"GET",
	url:'/blog/add_to_favourites/',
	datatype:"xml",
	data:{message_id:id},
	success:(xml)=>{
		alert(xml.lastElementChild.outerHTML);
	}
});
$.ajax({
	type:"GET",
	url:'/blog/remove_from_favourites/',
	datatype:"xml",
	data:{message_id:id},
	success:(xml)=>{
		alert(xml.lastElementChild.outerHTML);
	}
});
$.ajax({
	type:"GET",
	datatype:'xml',
	url:'/blog/admin_delete/',
	data:{
		message_id:id
	},
	cache:false,
	success:(xml)=>{
		alert(xml);
	}
});
//если id==0,то создается пост,если передаем id то редактируем.
$.ajax({
type:"POST",
url:'blog/add/ajax_text/',
data:{
message_id:0,subj:"a",message:"b",tags:'',
who_idea:2,comments_idea:0
},
success:(a)=>alert(a),
error:()=>alert('err')
});
$.ajax({
	type:"POST",
	url:"blog/add/ajax_mood/",
	data:{
	mood:"текст настроения"
},
success:(a)=>alert(a),
error:()=>alert('err')
});
data={
	is_ajax : 1,
	username:'Шинвия Нежная',
	in_reply:"0", //"0",то новое сообщение,1 ответ
	mail_subj:"Привет", //тема письма
	mail_message:"Как дела?"
};
$.ajax({
	type:"POST",
	url:'/mail/send',
	data:data,
	cache:false,
	datatype:'xml',
	success:(xml)=>alert(xml)
});
$.ajax({
				data : {
					'message_id[]' : message_ids
				},
				url : '/mail/delete/',
				type : 'POST',
				dataType : 'xml',
				cache : false,
				success : (xml)=>alert(xml)
});
$.ajax({
type : 'GET',
url : '/mail/friendship/deny/',
data : {
id : "5078762"
},
dataType : 'xml',
success : (xml)=>alert(xml.lastElementChild.outerHTML)
});
//авторизация! еееееееее!
$.ajax({
	type:"POST",
	url:"login/",
	data:{
		login:"login",
		password:"password",
		return_url:""
	},
	success:(xml)=>alert(xml),
	error:()=>alert('err')
});
/*
$.ajax({
data : {
comment_id : comment_id,
value : value
},
url : '/blog/comments/vote/',
type : 'GET',
datatype : 'xml',
cache : false,
success:(xml)=>alert(xml)
});
*/
