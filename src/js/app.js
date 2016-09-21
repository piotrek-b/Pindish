angular.module('pindish', ['ngDialog', 'ngRoute', 'appDirectives', 'angular-media-preview'])

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.xhtml"
        })
})

.controller('dialogController', ['$scope', 'ngDialog', function($scope, ngDialog) {

    //-- POPUPS
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

    $scope.addRecipeExtPopup = function (recipe) {
        $scope.closePopup();

        if (recipe === null) recipe = $scope.recipeInterface;//TODO: Interface is bad name, better one : SCHEMA (IMHO)

        $scope.openPopup('addNewRecipeExtTml.xhtml', 'ngdialog-theme-default theme-recipe-popup theme-padding-50px', recipe);
    };

    $scope.recipePopup = function (recipe) {
        $scope.closePopup();
        $scope.openPopup('recipePopupTml.xhtml', 'ngdialog-theme-default theme-recipe-popup theme-padding-50px', recipe);
    };

    $scope.signInPopup = function (recipe) {
        $scope.closePopup();
        $scope.openPopup('signInTml.xhtml', 'ngdialog-theme-default', null);
    };

    $scope.signUpPopup = function (recipe) {
        $scope.closePopup();
        $scope.openPopup('signUpTml.xhtml', 'ngdialog-theme-default', null);
    };
    //-- POPUPS end , TODO: would you consider to take out this whole popUp logic to another file with some comments?
    // recipe.Interface(change name) is used only here, i think it is good to take this all out, and use it
    // the only change is to pass NGDIALOG as argument where it is needed (JUST A CONSIDER, YOU MAY NOT DO IT)
    // and we would lose all the $scope pinging during invoking :)

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

    $scope.addElement = function (element, array) {
        if (!$scope.containsElement(element, array) && element.length > 0) array.push(element);
    }

    $scope.removeElement = function(indexOf, array) {
        if (indexOf !== undefined) array.splice(indexOf, 1);
    }

    $scope.containsElement = function(element, array) {
        if (array === undefined) return false;
        return array.indexOf(element) >= 0 ? true : false;
    }

    $scope.openImageInput = function(id) {
        document.getElementById('add-image-input').click();
    }

    $.getJSON('../json/recipes.json', function(dataJson) {
        $scope.recipes = dataJson;//TODO: again bad naming after all

        $scope.recipesSix = diveRecipesIntoRowAndFilter(dataJson, "", 0);//TODO: Such a foolish name(my bad)
    });

    $scope.readURL = function(input, id) {//TODO: Formatting and little comment needed what is that
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#ar')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
    };
    reader.readAsDataURL(input.files[0]);
  }
}


    //Data filter/sort options
    $scope.filterName = "";
    $scope.nameSort = 0; //0 - defualt, 1 - a->z , 2 z->a

    $scope.recipeInterface = {
        link: "",
        name: "",
        description: "",
        ingredients: []
    }

    var countRecipes = 0;
}])
