// Module initialization
angular.module('pindish', ['ngDialog'])

.directive('navigationBar', function() {
  return {
    restrict : 'A',
    templateUrl : 'navigation.xhtml'
  };
})

.controller('dialogController', ['$scope', 'ngDialog', function ($scope, ngDialog) {
  $scope.clickToOpen = function() {
    ngDialog.open({ template: 'popupTml.xhtml', className: 'ngdialog-theme-default' });
  };
  $.getJSON('../json/recipes.json', function( data ) {
    console.log(data);
    $scope.recipes =  data;
    //Making parts from data
    var len = data.length;
    var countByFive = Math.ceil(len / 5);

    var sixArray = new Array(countByFive);

    for (var i = 0; i < countByFive-1; i++) {
        sixArray[i] = new Array(5);
    }
    //add last row
    if(len % 5 === 0) {
      sixArray[countByFive-1] = new Array(5);
    } else {
      sixArray[countByFive-1] = new Array(len % 5);
    }

    //now we put data into arrays
    for (i = 0; i < len; i++) {
      console.log(countByFive);
      var x = Math.floor(i / 5);
      var y = i % 5;
      sixArray[x][y] = data[i];
    }

    $scope.recipesSix = sixArray;

  });

  var countRecipes = 0;
}])

.directive('recipesDirective', function() {
  return {
    restrict : 'A',
    templateUrl : 'recipeTml.html'
  };
})
