// Module initialization
var sortData = function(data, name) {
    if (name === 0) {
        return data;
    }

    var newData = data.sort(function(recipeA, recipeB) {
        if (name === 1) {
            return recipeA.name.toLowerCase() > recipeB.name.toLowerCase() ? 1 : -1;
        } else {
            return recipeA.name.toLowerCase() < recipeB.name.toLowerCase() ? 1 : -1;
        }
    });

    return newData;
}

var filterAndSortData = function(data, filter, name) {
    data = sortData(data, name);

    filter = filter.toLowerCase();

    var newData = [];
    var len = data.length;

    for (var i = 0; i < len; i++) {
        //we check if filter is within a name of recipe
        if (data[i].name.toLowerCase().indexOf(filter) !== -1) {
            newData.push(data[i]);
        }
    }
    return newData;
}

var parseRecipesFromJson = function(tempData, filter, name) {
    var cloneTempData = JSON.parse(JSON.stringify(tempData));

    var data = filterAndSortData(cloneTempData, filter, name);

    var recipesInRow = 6;
    //Making parts from data
    var len = data.length;
    var countBy = Math.ceil(len / recipesInRow);

    var sixArray = new Array(countBy);

    for (var i = 0; i < countBy - 1; i++) {
        sixArray[i] = new Array(recipesInRow);
    }
    //add last row
    if (len % recipesInRow === 0) {
        sixArray[countBy - 1] = new Array(recipesInRow);
    } else {
        sixArray[countBy - 1] = new Array(len % recipesInRow);
    }

    //now we put data into arrays
    for (i = 0; i < len; i++) {
        var x = Math.floor(i / recipesInRow);
        var y = i % recipesInRow;
        sixArray[x][y] = data[i];
    }

    return sixArray;
};
