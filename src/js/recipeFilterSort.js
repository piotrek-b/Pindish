// Module initialization
var TYPES_OF_SORTING = {
    NO_SORTING: 0,
    DECREASING: 1,
    INCREASING: 2
};

var sortRecipes = function(recipes, typeOfSorting) {
    if (typeOfSorting === TYPES_OF_SORTING.NO_SORTING) {
        return recipes;
    }

    var sortedRecipes = recipes.sort(function(recipeA, recipeB) {
        if (typeOfSorting === TYPES_OF_SORTING.DECREASING) {
            return recipeA.name.toLowerCase() > recipeB.name.toLowerCase() ? 1 : -1;
        } else {
            return recipeA.name.toLowerCase() < recipeB.name.toLowerCase() ? 1 : -1;
        }
    });

    return sortedRecipes;
};

var filterAndSortRecipes = function(recipes, filterForTitle, typeOfSorting) {
    recipes = sortRecipes(recipes, typeOfSorting);

    filterForTitle = filterForTitle.toLowerCase();

    var filteredRecipes = [];
    var numberOfRecipes = recipes.length;

    for (var ithRecipe = 0; ithRecipe < numberOfRecipes; ithRecipe++) {
        //we check if filter is within a name of recipe
        if (recipes[ithRecipe].name.toLowerCase().indexOf(filterForTitle) !== -1) {
            filteredRecipes.push(recipes[ithRecipe]);
        }
    }
    return filteredRecipes;
};

var createEmptyTableForRecipes = function(numberOfRecipes, recipesInRow) {
    var numberOfRows = Math.ceil(numberOfRecipes / recipesInRow);

    var tableWithRecipes = new Array(numberOfRows);

    for (var i = 0; i < numberOfRows - 1; i++) {
        tableWithRecipes[i] = new Array(recipesInRow);
    }
    //add last row
    if (numberOfRecipes % recipesInRow === 0) {
        tableWithRecipes[numberOfRows - 1] = new Array(recipesInRow);
    } else {
        tableWithRecipes[numberOfRows - 1] = new Array(numberOfRows % recipesInRow);
    }

    return tableWithRecipes;
};

var diveRecipesIntoRowAndFilter = function(recipes, filterForTitle, typeOfSorting) {
    var cloneOfRecipes = JSON.parse(JSON.stringify(recipes));

    var filteredAndSortedRecipes = filterAndSortRecipes(cloneOfRecipes, filterForTitle, typeOfSorting);

    var recipesInRow = 6;

    //Making parts from data
    var numberOfRecipes = filteredAndSortedRecipes.length;

    var tableWithRecipes = createEmptyTableForRecipes(numberOfRecipes, recipesInRow);

    // Here we create the "Add Recipe Card"
    if (tableWithRecipes.length !== 0) { [0][0] = { name: "Add recipe card" } }

    //Now we put data into arrays
    for (var ithRecipe = 1; ithRecipe < numberOfRecipes; ithRecipe++) {
        //We start from the recipe with the index 1, and then put a recipe with index less by one,
        //because position [0][0] is reserved for the "Add Recipe Card",
        //so we need to start from the [0][1] position.
        var row = Math.floor(ithRecipe / recipesInRow);
        var column = ithRecipe % recipesInRow;
        tableWithRecipes[row][column] = filteredAndSortedRecipes[ithRecipe - 1];
    }

    return tableWithRecipes;
};
