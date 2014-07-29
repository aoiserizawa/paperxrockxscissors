var io = require('socket.io');

exports.initialize = function(server){
    io = io.listen(server);
    var users = {}

    io.sockets.on('connection', function(socket){
      var showAllUsers = function(){
        io.sockets.emit('showUsers', users);
      };

      showAllUsers();

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
	       		socket.username = data;
	       		users[socket.username] = {'id' : socket.id};
                showAllUsers();
                console.log(users);
	       	}
       });

       var connectTo = function (user){
        console.log(user);
        io.sockets.to(user['opponentId']).emit('attemptConnection', {username: user['opponentName']});
       };

       socket.on('connectToUserX', function(data){
        connectTo(data);
       });

       socket.on('disconnect', function(data){
            if(!socket.username) return;
              console.log(socket.username+": disconnect");
              delete users[socket.username];
              // OLD
              //usernames.splice(usernames.indexOf(socket.username), 1);
              showAllUsers();
        });

    });
};
