// -- MAIN CONTROLLER
angular.module('pindish')
    .controller('dialogController', ['$scope', 'popupService', 'helperService', function($scope, popupService, helperService) {

        // -- VARIABLES


        // Data filter/sort options
        $scope.filterName = "";
        $scope.nameSort = 0; //0 - defualt, 1 - a->z , 2 z->a

        // Recipes count.
        var countRecipes = 0;

        // Popup functionality.
        $scope.popup = popupService;

        // Helper functions.
        $scope.helper = helperService;


        // -- VARIABLES end


        // -- FUNCTIONS

        // Function, which checks whether the recipes array is defined, it's
        // not null or contains only 'Add recipe card'
        $scope.emptyRecipes = function() {
            if ($scope.recipesRows === null || $scope.recipesRows === undefined ||
                $scope.recipesRows.length === 0) {
                return true;
            } else {
                return $scope.recipesRows[0].length === 1;
            }
        };


        // -- SORTING


        // Function, which changes sorting criterion.
        $scope.changeNameSort = function() {
            $scope.nameSort = ($scope.nameSort + 1) % 3;
        }

        // Function, which changes sorting criterion icon from search/sort bar.
        $scope.changeNameSortIcon = function() {
            if ($scope.nameSort === 0) {
                return "fa fa-clock-o";
            } else if ($scope.nameSort === 1) {
                return "fa fa-sort-alpha-asc";
            } else {
                return "fa fa-sort-alpha-desc";
            }
        }

        // -- SORTING end


        $.getJSON('../json/recipes.json', function(dataJSON) {
            $scope.recipesJSON = dataJSON;

            $scope.recipesRows = diveRecipesIntoRowAndFilter($scope.recipesJSON,
                "", $scope.nameSort);
        });

        // -- FUNCTIONS end
    }])
