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

.directive('footerBar', function() {
    return {
        restrict: 'A',
        templateUrl: 'footer.xhtml'
    };
})

.directive("toggleFilter", function() {
    return {
        restrict: "A",
        link: function() {
            $("#nav-filter").click(function() {
                $("#recipes-bar").slideToggle("fast");
            });
        }
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

    $scope.isAddRecipeCard = function(row, column) {
        return row === 0 && column === 0;
    }

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
