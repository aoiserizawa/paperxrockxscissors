$(document).ready(function(){
	// call the socket.io
	var socket 		= io.connect();

	var $userName 	= $('#user-name');
	var joinButton 	= $('#join-btn');

	joinButton.on('click', function(e){
		e.preventDefault();
		socket.emit('newUser', $userName.val(), function(data){
			if(data){
                   
             }else{ 
               console.log("already taken");    
             }
		});	
	});


	socket.on('showUsers', function(data){

		$('.users-list').html("");
		$.each(data['users'], function(key, value){
		console.log(key+" : "+value['id']);
		// $('.users-list').html()
		if(value['id'] != data['id']){
			$('.users-list').append("<li><button>"+key+"</button></li>");
			}
		else{
			console.log(data['id']);
		}
		});
	});

});
