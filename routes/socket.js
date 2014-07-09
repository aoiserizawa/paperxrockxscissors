var io = require('socket.io');

exports.initialize = function(server){
    io = io.listen(server);
    var users = {}

    io.sockets.on('connection', function(socket){
       socket.on('newUser', function(data, callback){
	       	if(data in users){	
	       		callback(false);
	       	}else{
	       		callback(true);
	       		socket.username = data;
	       		users[socket.username] = {'id' : socket.id};
	       	}

	       	console.log(users);
       });
    });
};
