// Module initialization
var filterJsonByName = function(data, filter) {
  var newData = [];
  console.log(data);
  var len = data.length;

  for(var i = 0; i < len; i++) {
    //we check if filter is within a name of recipe
    if(data[i].name.toLowerCase().indexOf(filter) !== -1) {
      newData.push(data[i]);
      console.log(data[i]);
    }
  }
  console.log(newData.length);
  return newData;
}

var parseRecipesFromJson = function (data, filter) {
  //filter data
  data = filterJsonByName(data, filter);

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

  $scope.emptyRecipes = function () {
    return $scope.recipesSix.length === 0;
  };

  $.getJSON('../json/recipes.json', function( data ) {
    console.log(data);
    $scope.recipes =  data;

    $scope.recipesSix = parseRecipesFromJson(data, "");
  });

  //name in filter
  $scope.filterName = "";

  var countRecipes = 0;
}])

.directive('recipesDirective', function() {
  return {
    restrict: 'A',
    templateUrl: 'recipeTml.xhtml',
    link: function($scope, element, attrs) {
      $scope.$watch('filterName', function(newVal, oldVal){
        //filter Json
        $scope.recipesSix = parseRecipesFromJson($scope.recipes, newVal);
      });
    }
  };
})
