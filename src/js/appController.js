// -- MAIN CONTROLLER
angular.module('pindish')
    .controller('dialogController', ['$scope', 'popupService', 'helperService', function($scope, popupService, helperService) {

        // -- VARIABLES


        // Data filter/sort options
        $scope.sortOrder = '';
        $scope.sortOrderNr = 0; //0 - defualt, 1 - a->z , 2 z->a

        // Recipes count.
        $scope.countRecipes = 0;

        // Popup functionality.
        $scope.popup = popupService;

        // Helper functions.
        $scope.helper = helperService;

        // Show 'Add Recipe Card' criterion.
        $scope.showAddRecipeCard = true;


        // -- VARIABLES end


        // -- FUNCTIONS

        // -- SORTING


        // Function, which changes sorting criterion.
        $scope.changeSortOrder = function() {
            $scope.sortOrderNr = ($scope.sortOrderNr + 1) % 3;
            
            switch ($scope.sortOrderNr) {
                case 0:
                    $scope.sortOrder = '';
                    break;
                case 1:
                    $scope.sortOrder = 'title';
                    break;
                case 2:
                    $scope.sortOrder = '-title';
                    break;
                default:
                    $scope.sortOrder = '';
                    break;
            }
        }

        // Function, which changes sorting criterion icon from search/sort bar.
        $scope.sortOrderIcon = function() {
            sortOrderIcon = '';

            switch ($scope.sortOrderNr) {
                case 0:
                    sortOrderIcon = "fa fa-clock-o";
                    break;
                case 1:
                    sortOrderIcon = "fa fa-sort-alpha-asc";
                    break;
                case 2:
                    sortOrderIcon = "fa fa-sort-alpha-desc";
                    break;
                default:
                    sortOrderIcon = "fa fa-clock-o";
                    break;
            }

            return sortOrderIcon;
        }

        // -- SORTING end


        $.getJSON('../json/recipes.json', function(dataJSON) {
            $scope.recipes = $scope.recipes || JSON.parse(JSON.stringify(dataJSON));
        });

        // -- FUNCTIONS end
    }])
