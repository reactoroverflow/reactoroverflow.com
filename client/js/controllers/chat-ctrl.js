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
    var $usersList = $('#usersList');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    console.log($rootScope.activeUsers, "activeUsers rootscope")
    // socket.emit('new user', user.name, function(data){
    // });
    
    // socket.on('usernames', function(data){
      var html = '';
      for(var i = 0; i < $rootScope.activeUsers.length; i++){
        html += '<p id="' + $rootScope.activeUsers[i] + '">' + $rootScope.activeUsers[i] + '</p>';
      }
      console.log(html)
      // $usersList.html(html);
    // });

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
