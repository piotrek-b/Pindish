angular.module('appDirectives', [])

// MAIN PAGE ELEMENTS DIRECTIVES

.directive('navigationBar', function() {
    return {
        restrict: 'A',
        templateUrl: 'navigation.xhtml',
        controller: 'dialogController'
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

// RECIPE CARD/POPUP DIRECTIVES

.directive('recipeBook', function() {
    return {
        restrict: 'A',
        templateUrl: 'recipeTml.xhtml',
        link: function($scope, element, attrs) {
            $scope.$watch('filterName', function(newVal, oldVal) {
                //filter Json
                if (newVal !== oldVal) {
                    $scope.recipesSix = diveRecipesIntoRowAndFilter($scope.recipes, newVal, $scope.nameSort);
                }
            });

            $scope.$watch('nameSort', function(newVal, oldVal) {
                //filter Json
                if (newVal !== oldVal) {
                    $scope.recipesSix = diveRecipesIntoRowAndFilter($scope.recipes, $scope.filterName, newVal);
                }
            });
        }
    };
})

.directive('recipeCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'recipeCardTml.xhtml',
        controller: 'dialogController',
        scope: {
            recipe: '=',
            addRecipeCard: '='
        }
    };
})

.directive('recipeImg', function() {
    return {
        restrict: 'E',
        template: '<img data-ng-src="{{ recipe.link }}" alt=""/>',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeTitle', function() {
    return {
        restrict: 'A',
        template: '<strong>{{recipe.name}}</strong>',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeShortDescription', function() {
    return {
        restrict: 'A',
        template: '{{ truncateWithEllipsis(recipe.description, 50) }}',
        controller: 'dialogController',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeDescription', function() {
    return {
        restrict: 'A',
        template: '{{ recipe.description }}',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeIngredient', function() {
    return {
        restrict: 'A',
        template: '<i class="fa fa-circle-o" aria-hidden="true"></i> {{ingredient}}',
        scope: {
            ingredient: '='
        }
    };
})

// SIGN IN/UP POPUP DIRECTIVES

.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})

// ADD NEW RECIPE DIRECTIVES

.directive("fileread", function() {
    return {
        scope: {
            fileread: "="
        },
        link: function(scope, element, attributes) {
            element.bind("change", function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
})

.directive("addImage", [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            element.find('.add-image').click(function() {
                elem.find("input[type='file']").click();
            });
        }
}
}]);
