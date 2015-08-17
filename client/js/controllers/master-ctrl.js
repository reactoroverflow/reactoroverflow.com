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
    var $usersIDDiv = $('#users');
    $rootScope.importedListOfUsers = {};

    // var selectedUserID;
    jQuery(function($){
      $("body").click(function(event) {
        if(event.target.id) {        
          var eventTargetId = event.target.id.slice(6);
          if($rootScope.importedListOfUsers.hasOwnProperty(eventTargetId)) {
            $rootScope.selectedUserID = eventTargetId;
          }
        }
      });

      socket.emit('new user', user.login, function(data){
      });
      
      socket.on('usernames', function(data){
        for (var j = 0 ; j < data.length; j++) {
          $rootScope.importedListOfUsers[data[j]] = true;
        }
        var html = '';
        var newDataArray = _.filter(data, function(eachUserName) {
          return eachUserName !== user.login;
        });
        if(newDataArray.length === 0) {
          html = '<li class="sidebar-list"><a href="#">Waiting for users...</a></li>';
        }
        for (var i = 0 ; i < newDataArray.length; i++) {
          html += '<li class="sidebar-list"><a id="userid' + newDataArray[i] + '" href="#/chat/' + newDataArray[i] + '"> ' + newDataArray[i] + '</a></li>';
        }
        $usersIDDiv.html(html);
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
