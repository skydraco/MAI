module.exports = { calcWeight };

function getArrayTable(index) {
    var array = [];
    var temp =  Array.prototype.map.call(document.querySelectorAll('table[data-index="' + index + '"] input'), function(el) {
        return el.value ;
    });

    var i = -1, j = 0;
    var len = Math.sqrt(temp.length);

    for (var el = 0; el < temp.length; el++ ) {
        if (el % len === 0) {
            j=0;
            i++;
            array[i] = [];
        }
        array[i][j] = temp[el];
        j++;
    }
    return array;
}

function getSumColumn(array) {
    var sum = [];

    for (var j = 0; j < array[0].length; j++) {
        sum[j] = 0;
        for (var i = 0; i < array[0].length; i++ ) {
            sum[j] += +array[i][j];
        }
    }
    return sum;
}

function getAverageArray(array, sum) {
    for (var j = 0; j < array[0].length; j++) {
        for (var i = 0; i < array[0].length; i++ ) {
            array[i][j] /= +sum[j];
        }
    }
    return array;
}

function getWeight(array) {
    var weight = [];
    var len = array[0].length;

    for(var i = 0; i < len; i++) {
        weight[i] = 0;
        for (var j = 0; j < len; j++) {
            weight[i] += +array[i][j];
        }
        weight[i] /= +len;
    }
    return weight;
}

function calcWeight(index) {

    var Array = getArrayTable(index);
    for (var i = 0; i < Array.length; i++) {
        for (var j = 0; j < Array.length; j++) {
            if (j < i) {
                Array[i][j] = 1/+Array[j][i];
            }
        }
    }

    var sum = getSumColumn(Array);

    Array = getAverageArray(Array, sum);
    var weight = getWeight(Array);

    updateTableForms(index, Array);
    updateTableWeight(index, weight);
    return weight;
}

function updateTableForms(index, array) {
    var inputs = document.querySelectorAll('table[data-index="' + index + '"] input');
    var item = 0;

    for (var i = 0; i < array[0].length; i++) {
       for (var j = 0; j < array[0].length; j ++) {
           inputs[item].value = array[i][j].toFixed(3);
           item++;
       }
    }
}

function updateTableWeight(index, weight) {
    var td = document.querySelectorAll('table[data-index="' + index + '"] td[data-weight]');

    for (var i = 0; i < weight.length; i++) {
        td[i].innerText = weight[i].toFixed(3);
    }
}
