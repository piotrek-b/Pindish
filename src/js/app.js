angular.module('pindish', ['ngDialog', 'ngRoute', 'appDirectives'])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.xhtml"
        })
})

.controller('dialogController', ['$scope', 'ngDialog', function($scope, ngDialog) {

    $scope.openPopup = function (popupUrl, popupClass, data) {
        ngDialog.open({
            template: popupUrl,
            className: popupClass,
            controller: 'dialogController',
            data: data
        });
    };

    $scope.closePopup = function () {
        ngDialog.close();
    };

    $scope.addRecipePopup = function () {
        $scope.closePopup();
        $scope.openPopup('addNewRecipeTml.xhtml', 'ngdialog-theme-default', null);
    };

    $scope.addRecipeExtPopup = function () {
        $scope.closePopup();
        $scope.openPopup('addNewRecipeExtTml.xhtml', 'ngdialog-theme-default', null);
    };

    $scope.recipePopup = function (recipe) {
        $scope.closePopup();
        $scope.openPopup('recipePopupTml.xhtml', 'ngdialog-theme-default recipe-popup', recipe);
    };

    $scope.emptyRecipes = function () {
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
