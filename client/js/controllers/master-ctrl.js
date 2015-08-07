/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'Posts', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, Posts) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.submitSearch = function () {
        console.log('========= I am in the MasterCtrl trying to submitSearch() on ' + $scope.keywords);
        //call the factory method to grab specific posts from server
            //should initiate a GET request with the specific keywords from input field
            //the request is a JSON request

        Posts.searchPosts($scope.keywords);
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
