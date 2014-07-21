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
		$.each(data, function(key, value){
			console.log(key+" : "+value);
		});
	});

});
