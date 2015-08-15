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
    console.log('all user info', user);
    var stringifiedUserData = JSON.stringify(user);
    jQuery(function($){
      socket.emit('new user', stringifiedUserData, function(data){
      });
      
      socket.on('usernames', function(data){
        console.log('data',data);
        $rootScope.activeUsers = data;
        var html = '';
        for(var i = 0; i < data.length; i++){
          var parsedUserInfo = JSON.parse(data[i]) 
          html += '<li id="userid' + parsedUserInfo.id + '">' + parsedUserInfo.name + '</li>';
        }
        console.log(html)
        $users.html(html);
      });
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
