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
    console.log('socket.on new user, data', data);
    var parsedUserInfo = JSON.parse(data);
    console.log('socket.on new user, parsedUserInfo', parsedUserInfo);
    var userID = parsedUserInfo.id;
    console.log('socket.on new user, parsedUserInfo.id', parsedUserInfo.id);
    if (userID in users){
      callback(false);
    } else{
      callback(true);
      socket.userinfo = data;
      // console.log('-------------------> socket.on new user, socket.userinfo', socket.userinfo);
      console.log('-------------------> socket.on new user, socket', socket);

      users[userID] = data;
      // JSON.stringify(socket);
      // console.log('-------------------> socket.on new user, users', users);

      updateNicknames();
    }
    // console.log('-------------------> socket.on connection, users:', users);
  });
  
  function updateNicknames(){
    console.log('-------------------> socket.emit usernames, users:', users);
    // socket.emit('usernames', users);
    io.sockets.emit('usernames', users);
  }

  socket.on('send message', function(data, callback){
    console.log('-------------------> socket.on sendmessage, data:', data);
    console.log('-------------------> socket.on sendmessage, socket:', socket);

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
