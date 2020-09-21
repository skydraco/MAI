module.exports = { createTable, createButtonStart, clearTables, resultTable, clearTablesInput}

function createTable(Arr, index, main) {
    var tableArr=['<div><table data-index='+index+'>'];
    var N = Arr.length;
    //header
    tableArr.push('<tr><th>'+ main + '</th>');
    for (var i = 0; i < N; i++) tableArr.push('<th>'+Arr[i]+'</th>');
    tableArr.push('<th>Вес</th></tr>');

    //body
    for (var i = 0; i < N; i++) {
        tableArr.push('<tr><th>'+Arr[i]+'</th>');
        for (var j = 0; j < N; j++) {

            var input = '<input name="Arr" data-i="'+ i +'" data-j="'+ j +'" value="0" type="number" min="0" max="9" step="0.1" required/>';
            if (j < i) input = '<input name="Arr" data-i="'+ i +'" data-j="'+ j +'" value="0" type="number" disabled />';
            if (j === i) input = '<input name="Arr" data-i="'+ i +'" data-j="'+ j +'" value="1" type="number" disabled/>';

            tableArr.push('<td>'+ input +'</td>');
        }
        tableArr.push('<td data-weight></td>');
        tableArr.push('</tr>');
    }

    tableArr.push('</table></div>');
    document.querySelector('[data-to=table-app]').innerHTML += tableArr.join('\n');
}

function createButtonStart() {
    document.querySelector('[data-to=table-app]').innerHTML += '<button type="button" onclick="onCalcWeight()">Рассчитать</button>'
}

function clearTables() {
    document.querySelector('[data-to=table-app]').innerHTML = '';
    document.querySelector('[data-to=table-res]').innerHTML = '';
}

function clearTablesInput() {
    var input = document.querySelectorAll('[data-to=table-app] table input');
    var td = document.querySelectorAll('td[data-weight]');
    for (var i = 0; i < input.length;  i++) {
        if (input[i].getAttribute('data-i') !== input[i].getAttribute('data-j')) input[i].value = 0;
        else input[i].value = 1;
    }

    for (var i = 0; i < td.length; i++) {
        td[i].innerText = "";
    }
    document.querySelector('[data-to=table-res]').innerHTML = '';
}

function resultTable(alt, weight) {
    var tableArr=['<div><table>'];
    var N = alt.length;
    for (var i = 0; i < N; i++) {
        tableArr.push('<tr><th> '+alt[i]+' </th><td>'+(weight[i]* 100).toFixed(1) +'%</td>');
    }
    tableArr.push('</table></div>');
    document.querySelector('[data-to=table-res]').innerHTML = tableArr.join('\n');
}