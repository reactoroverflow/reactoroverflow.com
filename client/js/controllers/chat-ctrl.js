'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('ChatCtrl', function ChatCtrl ($scope, $rootScope) {
  jQuery(function($){
    var socket = io.connect();
    var $nickForm = $('#setNick');
    var $nickError = $('#nickError');
    var $nickBox = $('#nickname');
    var $users = $('#users');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    // console.log("------------------------>user", user.name);
    // $nickForm.submit(function(e){
      // e.preventDefault();
      socket.emit('new user', user.name, function(data){
        console.log("socket emitting new user info, $nickBox.val():", user.name);
        // if(data){
        //   // $('#nickWrap').hide();
        //   // $('#contentWrap').show();
        // } else{
        //   $nickError.html('That username is already taken!  Try again.');
        // }
      });
      // $nickBox.val('');
    // }); //$nickForm.submit
    
    socket.on('usernames', function(data){
      var html = '';
      for(var i = 0; i < data.length; i++){
        html += data[i] + '<br/>';
      }
      $users.html(html);
    });
    
    $messageForm.submit(function(e){
      e.preventDefault();
      console.log("submitting message");
      socket.emit('send message', $messageBox.val(), function(data){
        $chat.append('<span class="error">' + data + "</span><br/>");
      });
      $messageBox.val('');
    });
    
    socket.on('new message', function(data){
      $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
    
    socket.on('whisper', function(data){
      $chat.append('<span class="whisper"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
  });

});
