'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('CreateCtrl', function CreateCtrl ($scope, $location, Posts) {
  $scope.title = '';
  $scope.tags = [];
  $scope.tag = '';
  $scope.tagsObject = {};
  $scope.content = [];
  $scope.isDisabled = true;
  $scope.instruction = '';
  $scope.data = '';
  $scope.tagPlaceholder = 'Add individual tags. Be specific.';
  $scope.enterTitleInstruc = 'Enter Title';
  $scope.categoryInstruc = 'Select Category';

  $scope.add = function() {
    var preview = document.getElementById('pic');
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function(e){
      preview.src = e.target.result;
      $scope.data = e.target.result;
    };
    r.readAsDataURL( f );
  }; //adds image data to $scope.data

  $scope.addTag = function(newTag) {
    var newTag = newTag.toLowerCase();
    $scope.tagPlaceholder = '';
    $scope.newTagBlankError = '';
    $scope.repeatedTagError = '';
    $scope.tagHasSpaceError = '';
    $scope.tag='';
    if(newTag !== '') {
      if(!$scope.tagsObject.hasOwnProperty(newTag)) {
        if(newTag.indexOf(' ')===-1) {
          $scope.tags.push(newTag);
          $scope.tagsObject[newTag]=true;
          $scope.tag = '';
        } else {
          $scope.tagHasSpaceError = 'Tags cannot have space';
        }
      } else {
        $scope.repeatedTagError = 'Tag already added';
      }
    } else {
      $scope.newTagBlankError = 'Tag cannot be blank';
    }
  };

  $scope.removeSelectCategoryInstruction = function() {
    $scope.categoryInstruc = '';
  }

  $scope.removeEnterTitleInstruction = function() {
    $scope.enterTitleInstruc = '';
  }
  $scope.showInstruction = function() {
    if(!$scope.newTagBlankError && !$scope.repeatedTagError && !$scope.tagHasSpaceError) {    
      $scope.instruction = 'Click on tag to remove';
    }
  };
  
  $scope.removeTag = function(index) {
    $scope.tags.splice(index, 1);
  };

  $scope.$on('$viewContentLoaded', function(){
    $scope.simplemde = new SimpleMDE({
      tabSize: 2
    });
    $scope.simplemde.render();
  });

  $scope.createPost = function() {
    $scope.post = {
      title: $scope.title, 
      content: marked($scope.simplemde.value()), 
      tags: $scope.tags, //format: Tags: ["asdf","asdf"]
      data: $scope.data
      }; //keys: title, content and tags
    Posts.addPost($scope.post)
    .then(function(resp) {
      $location.path('/post/'+resp._id); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.toggleDisable = function() {
    if ($scope.tags.length > 0) {
      if($scope.tagsObject.hasOwnProperty('question') ||
         $scope.tagsObject.hasOwnProperty('listing') || 
         $scope.tagsObject.hasOwnProperty('other')) {      
        $scope.isDisabled = false;
      }
    } 
  }
});
