'use strict';

var app = require('./lib/express');
var clog = require('./lib/clog');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

http.listen(4000, function(){
  clog.green('Listening on port 4000');
});

io.sockets.on('connection', function(socket){
  socket.on('new user', function(data, callback){
    if (data in users){
      callback(false);
    } else{
      callback(true);
      socket.userinfo = data;
      users[socket.userinfo] = socket;
      updateNicknames();
    }
  });
  
  function updateNicknames(){
    io.sockets.emit('usernames', Object.keys(users));
  }

  socket.on('send message', function(data, callback){
    var parsedUserInfo = JSON.parse(socket.userinfo);
    var userName = parsedUserInfo.name;
    var msg = data.trim();
    console.log('after trimming message is: ' + msg);
    if(msg.substr(0,3) === '/w '){
      msg = msg.substr(3);
      var ind = msg.indexOf(' ');
      if(ind !== -1){
        var name = msg.substring(0, ind);
        var msg = msg.substring(ind + 1);
        if(name in users){
          users[name].emit('whisper', {msg: msg, nick: userName});
          console.log('message sent is: ' + msg);
          console.log('Whisper!');
        } else{
          callback('Error!  Enter a valid user.');
        }
      } else{
        callback('Error!  Please enter a message for your whisper.');
      }
    } else{
      io.sockets.emit('new message', {msg: msg, nick: userName});
    }
  });
  
  socket.on('disconnect', function(data){
    if(!socket.userinfo) {return};
    delete users[socket.userinfo];
    updateNicknames();
  });
});

// module.exports = io;
