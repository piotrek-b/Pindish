angular.module('pindish', ['ngDialog', 'ngRoute', 'appDirectives'])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.xhtml"
        })
})

.controller('dialogController', ['$scope', 'ngDialog', function($scope, ngDialog) {

    $scope.addRecipePopup = function() {
        ngDialog.open({
            template: 'addNewRecipeTml.xhtml',
            className: 'ngdialog-theme-default',
            controller: 'dialogController'
        });
    };

    $scope.addRecipeExtPopup = function() {
        ngDialog.open({
            template: 'addNewRecipeExtTml.xhtml',
            className: 'ngdialog-theme-default',
            controller: 'dialogController'
        });
    };


    $scope.recipePopup = function(recipe) {
        ngDialog.open({
            template: 'recipePopupTml.xhtml',
            className: 'ngdialog-theme-default recipe-popup',
            controller: 'dialogController',
            data: recipe
        });
    };

    $scope.closePopup = function() {
        ngDialog.close();
    }

    $scope.emptyRecipes = function() {
        //First, it checks whether the recipe array is created, if it's not it
        //it returns true, otherwise it determines whether first row of array
        //has only one card - "Add recipe card".
        if ($scope.recipesSix === null || $scope.recipesSix.length === 0) {
            return true;
        } else {
            return $scope.recipesSix[0].length === 1;
        }
    };

    $scope.isAddRecipeCard = function(row, column) {
        return row === 0 && column === 0;
    }

    $scope.changeNameSort = function() {
        $scope.nameSort = ($scope.nameSort + 1) % 3;
    }

    $scope.changeNameSortIcon = function() {
        if ($scope.nameSort === 0) {
            return "fa fa-clock-o";
        } else if ($scope.nameSort === 1) {
            return "fa fa-sort-alpha-asc";
        } else {
            return "fa fa-sort-alpha-desc";
        }
    }

    $scope.truncateWithEllipsis = function(text, truncatedTextLength) {
        if (text.length > truncatedTextLength) {
            text = text.substring(0, truncatedTextLength).concat("...");
        }

        return text;
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
