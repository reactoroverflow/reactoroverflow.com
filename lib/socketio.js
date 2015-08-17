'use strict';

var socketio = require('socket.io');

module.exports = function(http) {
  var io = socketio(http);
  var users = {};

  io.sockets.on('connection', function(socket){
    socket.on('new user', function(data, callback){
      if (data in users){
        callback(false);
      } else {
        callback(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });
    
    function updateNicknames(){
      io.sockets.emit('usernames', Object.keys(users));
    }

    socket.on('send message', function(data, receiverUser, callback){
      var msg = data.trim();
      var name = receiverUser;
      var id = users[name].id;
      if (name in users){      
        users[name].emit('whisper', {msg: msg, nick: socket.nickname});
        socket.emit('new message', {msg: msg, nick: socket.nickname});
      } else {
        callback('Error!  Enter a valid user.');
      }
    });

    socket.on('disconnect', function(data){
      if(!socket.nickname) {return;}
      delete users[socket.nickname];
      updateNicknames();
    });
  });
};
