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
    var selectedUserID;
    jQuery(function($){
      $("body").click(function(event) {
        if(event.target.id) {        
          $rootScope.selectedUserID = event.target.id;
        };
      });
      socket.emit('new user', user.login, function(data){
      });
      socket.on('usernames', function(data){
        var html = '';
        var newDataArray = _.filter(data, function(eachUserName) {
          return eachUserName !== user.login;
        });
        if(newDataArray.length === 0) {
          html = '<li class="sidebar-list"><a href="#">Waiting for users...</a></li>';
        };
        for (var i = 0 ; i < newDataArray.length; i++) {
          html += '<li class="sidebar-list"><a id="userid' + newDataArray[i] + '" href="#/chat"> ' + newDataArray[i] + '</a></li>';
        };
        $users.html(html);
      });
    });
    $scope.submitSearch = function () {
        console.log('========= I am in the MasterCtrl trying to submitSearch() on ' + $scope.keywords);
        Posts.searchPosts($scope.keywords, function(data){
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
            };
        } else {
            $scope.toggle = false;
        };
    });
    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };
    window.onresize = function() {
        $scope.$apply();
    };
};
