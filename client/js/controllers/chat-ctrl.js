'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('ChatCtrl', function ChatCtrl ($scope, $rootScope) {
  jQuery(function($){
    var $nickForm = $('#setNick');
    var $nickError = $('#nickError');
    var $nickBox = $('#nickname');
    var $usersList = $('#usersList');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    var $templateWrap= $('.templateWrap');

    // console.log($rootScope.activeUsers, "activeUsers rootscope")
    // socket.emit('new user', user.name, function(data){
    // });
    
    // socket.on('usernames', function(data){
      // var html = '';
      // for(var i = 0; i < $rootScope.activeUsers.length; i++){
      //   html += '<p id="' + $rootScope.activeUsers[i] + '">' + $rootScope.activeUsers[i] + '</p>';
      // }
      // console.log(html)
      // $usersList.html(html);
    // });
    var selectedUserToSend = $rootScope.selectedUserID;
    $templateWrap.append('Chatting to: ', selectedUserToSend.slice(6));

    $messageForm.submit(function(e){
      e.preventDefault();
      console.log("submitting message");
      socket.emit('send message', $messageBox.val(), function(data){
        console.log("message succesfully sent");
        console.log('messageFormSubmit data', data);
        $chat.append('<span class="error">' + data + "</span><br/>");
      });
      $messageBox.val('');
    });

    socket.on('send message', function(data, callback){
      // console.log('-------------------> socket.on sendmessage, data:', data);
      // console.log('-------------------> socket.on sendmessage, socket:', socket);

      // var parsedUserInfo = JSON.parse(socket.userinfo);
      // var userName = parsedUserInfo.name;

      var msg = data.trim();
      console.log('after trimming message is: ' + msg);
      // if(msg.substr(0,3) === '/w '){
      //   msg = msg.substr(3);
      //   var ind = msg.indexOf(' ');
      //   if(ind !== -1){
          // var name = msg.substring(0, ind);
      var name = selectedUserToSend;
      var msg = msg.substring(ind + 1);
      if(name in users){
        // console.log('---------------->*****name',name);
        // console.log('---------------->*****msg',msg);          
        // console.log('---------------->*****users',users);
        // console.log('---------------->*****users[name]',users[name]);
        
        users[name].emit('whisper', {msg: msg, nick: socket.nickname});
        socket.emit('whisper', {msg: msg, nick: socket.nickname});

        // console.log('----------------->*******users[name].emit whisper executed');
        // also do the above line for the current user. 
        console.log('message sent is: ' + msg);
        console.log('Whisper!');
      } else {
        callback('Error!  Enter a valid user.');
      }
      //   } else{ //index does not exist
      //     callback('Error!  Please enter a message for your whisper.');
      //   }
      // } else{ //if /w exists
      //   io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
      // }
    });
    
    socket.on('new message', function(data){
      console.log('data in new message',data);
      $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
    
    socket.on('whisper', function(data){
      console.log('--------------->socket.on whisper executed.');
      $chat.append('<span class="whisper"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
  });

});
