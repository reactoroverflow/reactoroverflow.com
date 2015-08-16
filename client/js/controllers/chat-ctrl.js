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
    var selectedUserToSend = $rootScope.selectedUserID;
    $templateWrap.append('Chatting to: ', selectedUserToSend);

    $messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $messageBox.val(), selectedUserToSend, function(data){
        $chat.append('<span class="error">' + data + "</span><br/>");
      });
      $messageBox.val('');
    });

    socket.on('new message', function(data){
      $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
    });
    
    socket.on('whisper', function(data){
      if(data.nick === $rootScope.selectedUserID) {
        $chat.append('<span class="whisper"><b>' + data.nick + ': </b>' + data.msg + "</span><br/>");
      } else {
        $chat.append('<span class="whisper"><b>[Message from another user] ' + data.nick + ': </b>' + data.msg + "</span><br/>");
      };
    });
  });
});
