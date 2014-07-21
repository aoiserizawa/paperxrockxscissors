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
		$.each(data, function(key, value){
		console.log(key+" : "+value);
		// $('.users-list').html()
		$('.users-list').append("<li><button>"+key+"</button></li>");

		});
	});

});
