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
                       
             }
		});
	});

});
