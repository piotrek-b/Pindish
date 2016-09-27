//-- POPUPS
angular.module('pindish')
    .factory('popupService', ['ngDialog', function(ngDialog) {

        // Recipe schema, which is used in the adding new recipe process.
        var recipeSchema = {
            link: "",
            title: "",
            image: "",
            description: "",
            ingredients: []
        };

        // Function, which opens dialog with given parameters.
        var openPopup = function(popupUrl, popupClass, data) {
            ngDialog.close();
            ngDialog.open({
                template: popupUrl,
                className: popupClass,
                controller: 'dialogController',
                data: data
            })
        }

        // -- SERVICE

        var popupServiceInstance = {};

        // Function, which closes opened popup.
        popupServiceInstance.closePopup = function() {
            ngDialog.close();
        }

        // Function, which opens first 'Add Recipe Popup'.
        popupServiceInstance.addRecipePopup = function() {
            openPopup('addNewRecipeTml.xhtml', 'ngdialog-theme-default', null);
        }

        // Function, which opens second 'Add Recipe Popup', extended (containing
        // loaded recipe information).
        popupServiceInstance.addRecipeExtPopup = function(recipe) {
            if (recipe === null || recipe === undefined) recipe = recipeSchema;

            openPopup('addNewRecipeExtTml.xhtml', 'ngdialog-theme-default theme-recipe-popup theme-padding-50px', recipe);
        }

        // Function, which opens 'Recipe Popup' of given recipe.
        popupServiceInstance.recipePopup = function(recipe) {
            openPopup('recipePopupTml.xhtml', 'ngdialog-theme-default theme-recipe-popup theme-padding-50px', recipe);
        }

        // Function, which opens 'Sign In Popup'.
        popupServiceInstance.signInPopup = function(recipe) {
            openPopup('signInTml.xhtml', 'ngdialog-theme-default', null);
        }

        // Function, which opens 'Sign Up Popup'.
        popupServiceInstance.signUpPopup = function(recipe) {
            openPopup('signUpTml.xhtml', 'ngdialog-theme-default', null);
        }


        // -- SERVICE end

        return popupServiceInstance;
    }])
