// -- CUSTOM DIRECTIVES
angular.module('appDirectives', [])

// -- MAIN PAGE ELEMENTS DIRECTIVES


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


// -- MAIN PAGE ELEMENTS DIRECTIVES end


// -- RECIPE CARD/POPUP DIRECTIVES

.directive('recipeBook', function() {
    return {
        restrict: 'A',
        templateUrl: 'recipeBook.xhtml'
    };
})

.directive('recipeCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'recipeCardTml.xhtml',
        controller: 'dialogController',
        scope: {
            recipe: '='
        }
    };
})

.directive('addRecipeCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'addNewRecipeCardTml.xhtml',
        controller: 'dialogController'
    };
})

.directive('recipeImg', function() {
    return {
        restrict: 'E',
        template: '<img data-ng-src="{{ recipe.image }}" alt=""/>',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeTitle', function() {
    return {
        restrict: 'A',
        template: '<strong>{{recipe.title}}</strong>',
        scope: {
            recipe: '='
        }
    };
})

.directive('recipeShortDescription', function() {
    return {
        restrict: 'A',
        template: '{{ helper.truncateWithEllipsis(recipe.description, 50) }}',
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


// -- RECIPE CARD/POPUP DIRECTIVES end


// -- SIGN IN/UP POPUP DIRECTIVES


.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})


// -- SIGN IN/UP POPUP DIRECTIVES end


// -- ADD NEW RECIPE DIRECTIVES


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
}])

.directive('addNewRecipeIngredient', function() {
    return {
        restrict: 'A',
        template: '- {{ingredient}}',
        scope: {
            ingredient: '='
        }
    };
})


// -- ADD NEW RECIPE DIRECTIVES end
