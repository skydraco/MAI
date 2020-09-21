module.exports = {MultiplyMatrix};

function MultiplyMatrix(w)
{
    var rowsA = 1, colsA = w[0].length,
        rowsB = (w.length - 1), colsB = w[1].length,
        C = [];
    if (colsA !== rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[ i ] = [];

    for (var k = 0; k < colsB; k++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += w[0][j] * w[j+1][k];
            C[0][k] = t.toFixed(3);
    }
    return C[0];
}