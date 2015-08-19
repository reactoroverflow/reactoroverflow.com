angular.module('hackOverflow.profile', ['ionic'])

.controller('ProfileCtrl', function ($scope, $state, History) {
  $scope.data = {};
  $scope.data.goBack = function() {
    console.log("going back to: ", History.lastState);
    $state.go(History.lastState);
  };

  $scope.data.test = 'testing';
});