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
    $rootScope.activeUsers;
    jQuery(function($){
      // $(document).ready(function() {
        var socket = io.connect();
        socket.emit('new user', user.name, function(data){
          console.log('new user emitted',data);
        });

        socket.on('usernames', function(data){
          $rootScope.activeUsers = data;
          console.log('$rootScope.activeUsers-------------->', $rootScope.activeUsers);
          // console.log('masterCtrl------------->',$rootScope.activeUsers);
          console.log('masterCtrl-------------> Is array if true',Array.isArray($rootScope.activeUsers));
          console.log('$rootScope activeUsers-------------> type of what',typeof $rootScope.activeUsers);
          for (var i = 0 ; i < $rootScope.activeUsers.length; i++) {
            console.log($rootScope.activeUsers[i]);
          }
        });
        
      // }); //$document.ready
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
