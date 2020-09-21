module.exports = {createInput, deleteInput, clearInput};

function createInput(name, plch, to, from) {
    var html = document.querySelector('[data-to=' + name + ']');

    for (var i = to; i < from; i++) {
        html.innerHTML += "<div><input name='arr' placeholder='" + plch + "' data-input-i='" + i + "' data-input-n='" + name + "' min='2' step='0.1' required/>" +
            "<button onclick='onDeleteInput( " + i + ", `"  + name +  "`)'>X</button></div>";
    }

}
function deleteInput(index, name) {
    var rm = document.querySelector('[data-input-i="' + index + '"][data-input-n="'+ name +'"]');
    if (rm !== null)  {
        rm.parentElement.remove();
    }
}

function clearInput(to) {
    document.querySelector('[data-to="' + to + '"').innerHTML = '';
}
