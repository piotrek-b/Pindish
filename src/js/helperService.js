// -- HELPER FUNCTIONS
angular.module('pindish')
    .factory('helperService', function() {

        // Function which checks whether the array contains the given element.
        var containsElement = function(element, array) {
            if (array === undefined) {
                return false;
            }

            return array.indexOf(element) !== -1 ? true : false;
        }

        // -- SERVICE


        var helperServiceInstance = {};

        // Function, which checks whether card at the given coords is
        // 'Add Recipe Card'.
        helperServiceInstance.isAddRecipeCard = function(row, column) {
            return row === 0 && column === 0;
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
            document.getElementById('add-image-input').click();
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
    })
