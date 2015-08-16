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
    // var parsedUserInfo = JSON.parse(data);
    // console.log('socket.on new user, parsedUserInfo', parsedUserInfo);
    // var userID = JSON.stringify(parsedUserInfo.id).slice();
    // console.log('socket.on new user, parsedUserInfo.id', parsedUserInfo.id);
    // var userID = "lina";
    if (data.id in users){
      callback(false);
    } else{
      callback(true);
      // console.log('-------------------> socket.on new user, socket.userinfo', socket.userinfo);
      // console.log('-------------------> socket.on new user, userID', userID);
      // console.log('-------------------> socket.on new user, typeof userID', typeof userID);
      // users[userID] = {};
      // console.log('-------------------> socket.on users, users:', users);
      console.log('-------------------> socket.on users, socket:', socket);
      // console.log('-------------------> socket.on users, socket.on:', socket.on);
      // console.log('-------------------> socket.on users, socket.emit:', socket.emit);


      socket.nickname = data.id;
      users[socket.nickname] = socket;

      // socket.nickname = data;
      // users[socket.nickname] = socket;

      // users[userID].socketInfo = socket;
      // users[userID].userinfo = parsedUserInfo;
      // // socket.userinfo = data;
      // JSON.stringify(socket);
      console.log('1.-------------------> socket.on new user, users', users);
      // var allUsers = JSON.stringify(users).slice();
      console.log('2.-------------------> socket.on new user, users', users);

      updateNicknames();
    }
    // console.log('-------------------> socket.on connection, users:', users);
  });
  
  function updateNicknames(){
    console.log('-------------------> socket.emit usernames, users:', users);
    console.log('-------------------> socket.emit usernames, typeof users:', typeof users);
    // var stringifiedUsers = JSON.stringify(users);
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
          console.log('---------------->*****name',name);
          console.log('---------------->*****msg',msg);          
          console.log('---------------->*****users',users);
          console.log('---------------->*****users[name]',users[name]);

          
          users[name].emit('whisper', {msg: msg, nick: userName});

          console.log('----------------->*******users[name].emit whisper executed');
          // also do the above line for the current user. 
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
