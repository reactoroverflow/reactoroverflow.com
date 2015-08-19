angular.module('hackOverflow.tags', [])

.controller('TagsCtrl', function($scope, Tags) {
  $scope.tags = Tags.tags;
});