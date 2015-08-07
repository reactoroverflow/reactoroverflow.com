'use strict';

/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$rootScope', '$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($rootScope, $scope, $cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.submitSearch = function () {
        console.log("========= I am in the MasterCtrl trying to submitSearch()");
        //call the factory method to grab specific posts from server
            //should initiate a GET request with the specific keywords from input field
            //the request is a JSON request

        //searchPosts();
        //$scope.keywords


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
