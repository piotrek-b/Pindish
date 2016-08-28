angular.module('pindish', ['ngDialog', 'ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.xhtml"
        })
})

.directive('navigationBar', function() {
    return {
        restrict: 'A',
        templateUrl: 'navigation.xhtml'
    };
})

.controller('dialogController', ['$scope', 'ngDialog', function($scope, ngDialog) {

    $scope.clickToOpen = function() {
        ngDialog.open({
            template: 'popupTml.xhtml',
            className: 'ngdialog-theme-default'
        });
    };

    $scope.closePopup = function() {
        ngDialog.close();
    }

    $scope.addRecipePopup = function() {
        ngDialog.open({
            template: 'addNewRecipeTml.xhtml',
            className: 'ngdialog-theme-default'
        });
    };

    $scope.addRecipeExtPopup = function() {
        ngDialog.open({
            template: 'addNewRecipeExtTml.xhtml',
            className: 'ngdialog-theme-default'
        });
    };

    $scope.emptyRecipes = function() {
        return $scope.recipesSix.length === 0;
    };

    $scope.changeNameSort = function() {
        $scope.nameSort = ($scope.nameSort + 1) % 3;
    }

    $scope.changeNameSortArrow = function() {
        if ($scope.nameSort === 0) {
            return "glyphicon-triangle-right";
        } else if ($scope.nameSort === 1) {
            return "glyphicon-triangle-bottom";
        } else {
            return "glyphicon-triangle-top";
        }
    }

    $.getJSON('../json/recipes.json', function(dataJson) {
        $scope.recipes = dataJson;

        $scope.recipesSix = diveRecipesIntoRowAndFilter(dataJson, "", 0);
    });

    //Data filter/sort options
    $scope.filterName = "";
    $scope.nameSort = 0; //0 - defualt, 1 - a->z , 2 z->a

    var countRecipes = 0;
}])

.directive('recipesDirective', function() {
    return {
        restrict: 'A',
        templateUrl: 'recipeTml.xhtml',
        link: function($scope, element, attrs) {
            $scope.$watch('filterName', function(newVal, oldVal) {
                //filter Json
                if (newVal !== oldVal)
                    $scope.recipesSix = diveRecipesIntoRowAndFilter($scope.recipes, newVal, $scope.nameSort);
            });

            $scope.$watch('nameSort', function(newVal, oldVal) {
                //filter Json
                if (newVal !== oldVal)
                    $scope.recipesSix = diveRecipesIntoRowAndFilter($scope.recipes, $scope.filterName, newVal);
            });
        }
    };
})
