var io = require('socket.io');

exports.initialize = function(server){
    io = io.listen(server);
    var users = {}

    io.sockets.on('connection', function(socket){
       socket.on('newUser', function(data, callback){
       	
	       	if(data in users){	
	       		callback(false);

                // NOTE: probably not needed
                // check if socket is already in the users objects
                // for (var user in users){
                //     var ids = users[user];
                //     for (var id in ids ){
                //         if(ids[id] === socket.id){
                //             console.log("in use :"+socket.id);
                //         }
                //     } 
                // }

	       	}else{
	       		callback(true);
	       		console.log(socket.id);
	       		socket.username = data;
	       		users[socket.username] = {'id' : socket.id};

                var usersLists = {users:users, id: socket.id};
                io.sockets.emit('showUsers', usersLists);
	       	}

       });
    });
};
