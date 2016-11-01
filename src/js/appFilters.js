// -- CUSTOM FILTERS
angular.module('appFilters', ['fastMemoizeModule'])

// -- RECIPES SPLITTING FILTER

.filter('splitIntoRows', ['fastMemoizeService', function(fastMemoizeService) {
    // Memoize is used to to store result of splitting for the same arguments, instead
    // of splitting it again. We avoid infinite digest loop and application works faster.
    return fastMemoizeService.memoize(function(recipes, recipesInRow, showAddRecipeCard, sortOrder) {
        
        // If recipes array is empty, return empty array.
        if (recipes.length === 0) return [];

        // Array, which is going to contain splitted recipes.
        var splittedRecipes = [];

        // First, check whether number of recipes is less than the number of recipes in row.
        // If so, push all the recipes to the first and only row.
        // Otherwise, few conditions needs to be checked.
        if (recipes.length < recipesInRow) {
            splittedRecipes.push(recipes.slice(0, recipes.length));
        } else {
            var i = 0;
            
            // Check whether 'Add Recipe Card' is visible. If so - first row should contain
            // recipesInRow - 1 recipes, because first place in this row is reserved for this card.
             if (showAddRecipeCard) {
                 splittedRecipes.push(recipes.slice(0, recipesInRow - 1));
                 i = recipesInRow - 1;
             } /*else {
                 splittedRecipes.push(recipes.slice(0, recipesInRow));
                 i = recipesInRow;
             }*/

            // Loop, which is used to push slices of the recipes array.
            // Inside there is a if statement - it checks, whether number
            // of remaining recipes is less than the number of recipes in row.
            // If so, push all the recipes to the row, last one in fact.
            // Otherwise, it pushes another slice containing another 
            // recipesInRow recipes.
            while (i < recipes.length) {
                if (recipes.length - i < recipesInRow) {
                    splittedRecipes.push(recipes.slice(i, recipes.length));
                } else {
                    splittedRecipes.push(recipes.slice(i, i + recipesInRow));
                }

                i += recipesInRow;
            }
        }

        return splittedRecipes;
    })
}])

// -- RECIPES SPLITTING FILTER end
