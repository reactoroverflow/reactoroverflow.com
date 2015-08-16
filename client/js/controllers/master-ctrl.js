'use strict';

/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$rootScope', '$scope', '$cookieStore', 'Posts', MasterCtrl]);

function MasterCtrl($rootScope, $scope, $cookieStore, Posts) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    var $users = $('#users');
    // var stringifiedUserData = JSON.stringify(user);
    // var loginName = user.login;
    // console.log('user.login inside masterCtrl', loginName);
    jQuery(function($){

      socket.emit('new user', user.login, function(data){
      });
      
      socket.on('usernames', function(data){
        console.log('----------------->socket.on triggered');
        console.log('------------------> socket.on usernames, data:', data);
        // console.log('------------------> socket.on usernames, typeof data:', Array.isArray(data));

        // $rootScope.activeUsers = data;
        var html = '';
        for (var i = 0 ; i < data.length; i++) {
          // console.log('data[key]-------------->',data[key]);

          // var indivUserInfo = JSON.parse(data[key]).userinfo;
          // console.log('indivUserInfo-------------->',indivUserInfo);
          // console.log('indivUserInfo.id-------------->',indivUserInfo.id);
          // console.log('indivUserInfo.name-------------->',indivUserInfo.name);
          html += '<li class="sidebar-list" id="userid' + data[i] + '"><a href="#"> ' + data[i] + '</a></li>';

        }
        // for(var i = 0; i < data.length; i++){
        //   var parsedUserInfo = JSON.parse(data[i]);
        //   html += '<li class="sidebar-list" id="userid' + parsedUserInfo.id + '"><a href="#"> ' + parsedUserInfo.name + '</a></li>';
        // }
        $users.html(html);
      });

      // socket.emit('new user', loginName, function(data){
      //   console.log('socket.emit on new user, data:', data);
      //   console.log('socket.emit on new user, loginName:', loginName);
      // });
      
      // socket.on('usernames', function(data){
      //   console.log('socket.on usernames',data);
      //   $rootScope.activeUsers = data;
      //   var html = '';
      //   for(var i = 0; i < data.length; i++){
      //     // var parsedUserInfo = JSON.parse(data[i]);
      //     html += '<li class="sidebar-list" id="userid' + data[i] + '"><a href="#"> ' + data[i] + '</a></li>';
      //   }
      //   $users.html(html);
      // });    
    });


    $scope.submitSearch = function () {
        console.log('========= I am in the MasterCtrl trying to submitSearch() on ' + $scope.keywords);
        //call the factory method to grab specific posts from server
            //should initiate a GET request with the specific keywords from input field
            //the request is a JSON request
        

        Posts.searchPosts($scope.keywords, function(data){
            //boradcast the response data to postlist-ctrl.js
            console.log('I am broadcasting the response data==== ', data);
            $rootScope.$broadcast('showResults', data);
        });
        $scope.keywords = '';


    };

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
