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
    var $users = $('#users');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    
    socket.on('usernames', function(data){
      $rootScope.activeUsers = data;
      console.log('$rootScope.activeUsers-------------->', $rootScope.activeUsers);
      // // var html = '';
      // for(var i = 0; i < data.length; i++){

      //   html += data[i] + '<br/>';
      // }
      // console.log('html------------------>',html)
      // $users.html(html);
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
