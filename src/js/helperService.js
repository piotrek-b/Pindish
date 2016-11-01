// -- HELPER FUNCTIONS
angular.module('pindish')
    .factory('helperService', ['$timeout', function($timeout) {

        // Function, which checks whether the array contains the given element.
        var containsElement = function(element, array) {
            if (array === undefined) {
                return false;
            }

            return array.indexOf(element) !== -1 ? true : false;
        }

        // -- SERVICE


        var helperServiceInstance = {};

        // Function, which checks whether the array is empty, null or undefined.

        helperServiceInstance.isEmpty = function(array) {
            if (array === null || array === undefined ||
                array.length === 0) {
                return true;
            } else {
                return false;
            }
        }

        // Function, which checks whether card at the given coords is
        // 'Add Recipe Card'.
        helperServiceInstance.isAddRecipeCard = function(showAddRecipeCard, index) {
            return showAddRecipeCard && index === 0;
        }

        // Function which truncates text to the given length and appends the ellipsis.
        helperServiceInstance.truncateWithEllipsis = function(text, truncatedTextLength) {
            if (text.length > truncatedTextLength) {
                text = text.substring(0, truncatedTextLength).concat("...");
            }

            return text;
        }


        // Function which opens image input in 'Add New Recipe' popup.
        helperServiceInstance.openImageInput = function() {
            // We use $timeout service to get rid of '$apply already in progress'
            // error, which occurs, when click event triggers another click
            // event (click on icon -> click on input), both using $apply.
            $timeout(function() {
            document.getElementById('add-image-input').click();
        }, 0);
        }

        // -- ARRAY MANIPULATION


        // Function which pushes the element to the array, if it's not empty or
        // it's not already there.
        helperServiceInstance.addElement = function(element, array) {
            if (!containsElement(element, array) && element.length > 0) {
                array.push(element);
            }
        }

        //Function which removes element at the given index of the array.
        helperServiceInstance.removeElement = function(indexOf, array) {
            if (indexOf !== undefined && indexOf < array.length) {
                array.splice(indexOf, 1);
            }
        }


        // -- ARRAY MANIPULATION end


        // -- SERVICE end

        return helperServiceInstance;
    }])
