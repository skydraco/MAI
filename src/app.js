import { createInput, deleteInput, clearInput } from './gener/inputForms.js'
import { createTable, clearTables, resultTable, clearTablesInput } from './gener/tableForms.js'
import { calcWeight } from './math/math.js'
import * from './math/matrix.js'
var altN = 2, appN = 2, Alt, App;
var weight = [];

function convertArray(name) {
    return Array.prototype.map.call(document.querySelectorAll("[data-input-n="+ name +"]"), function(el) {
        return el.value ;
    });
}

window.InitializGo = function () {
    clear();
    createMinInput();
    altN = document.getElementById('AltN').value;
    appN = document.getElementById('AppN').value;
    createInput( 'alt','Альтернатива', 2, altN);
    createInput('app', 'Критерий', 2, appN);
};

function clear() {
    altN = appN = 2;
    Alt = App = [];
    clearInput('alt');
    clearInput('app');
    clearTables();
}

function createMinInput() {
    createInput( 'alt','Альтерантива', 0, 2);
    createInput('app', 'Критерий', 0, 2);
}

//Интерактив buttons
window.onDeleteInput = function(i, n) { deleteInput(i, n);}
window.onClearInput = function(to) { clearInput(to); }
window.onClear = function() { clear(); createMinInput(); }
window.onClearTable = function() { clearTablesInput()  }
window.onCalcWeight = function() {

    if (document.querySelector('[data-to=table-res]').innerHTML === '') {
        if (inspecTables()) {
            for (var i = 0; i < App.length + 1; i++) {
                weight[i] = calcWeight(i);
            }
            var result = MultiplyMatrix(weight);
            resultTable(Alt, result);
        } else {
            document.querySelector('.error').classList.add('is-active');
        }
    }
};

window.varInit = function() {
    clearTables();
    App = convertArray('app');
    Alt = convertArray('alt');

    if (inspectArray(App) && inspectArray(Alt)) {
        createTable(App, 0, ' ');
        for (var i = 1; i < App.length + 1; i++) {
            createTable(Alt, i, App[i - 1]);
        }
    } else {
        document.querySelector('.error').classList.add('is-active');
    }
};

window.onload = function() {createMinInput();}

function inspectArray(array) {

    if (array.length < 2) return false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == '') return false;
    }

    return true;

}

function inspecTables() {
    var temp = document.querySelectorAll('[data-to=table-app] table input');

    for (var i = 0; i < temp.length; i++) {
        if (temp[i].getAttribute('data-i') < temp[i].getAttribute('data-j'))
            if ((+temp[i].value === 0) || (temp[i].value == null)) return false;

    }
    return true;
}
