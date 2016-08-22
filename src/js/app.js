// Module initialization
var parseRecipesFromJson = function (data) {
  var recipesInRow = 6;
  //Making parts from data
  var len = data.length;
  var countBy = Math.ceil(len / recipesInRow);

  var sixArray = new Array(countBy);

  for (var i = 0; i < countBy-1; i++) {
      sixArray[i] = new Array(recipesInRow);
  }
  //add last row
  if(len % recipesInRow === 0) {
    sixArray[countBy-1] = new Array(recipesInRow);
  } else {
    sixArray[countBy-1] = new Array(len % recipesInRow);
  }

  //now we put data into arrays
  for (i = 0; i < len; i++) {
    console.log(countBy);
    var x = Math.floor(i / recipesInRow);
    var y = i % recipesInRow;
    sixArray[x][y] = data[i];
  }

  return sixArray;
};

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

  $scope.addRecipePopup = function() {
    ngDialog.open({ template: 'addNewRecipeTml.xhtml', className: 'ngdialog-theme-default' });
  };

  $.getJSON('../json/recipes.json', function( data ) {
    console.log(data);
    $scope.recipes =  data;

    $scope.recipesSix = parseRecipesFromJson(data);
  });

  var countRecipes = 0;
}])

.directive('recipesDirective', function() {
  return {
    restrict : 'A',
    templateUrl : 'recipeTml.xhtml'
  };
})
