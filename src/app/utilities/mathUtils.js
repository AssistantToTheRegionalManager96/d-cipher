
// MODULO ACTIONS

const ModuloInvert = (input, modulo) => {
    var g = GreatestCommonDenominator(input, modulo);
    if (g != 1) throw new Error("Modulo invert does not exist")

    var inv = 0;
    while((input * inv) % modulo != 1) inv = inv + 1;
    return inv;
}

const ModuloDivide = (a, b, m) => {
    return ((a * ModuloInvert(b, m)) % m);
}

const GreatestCommonDenominator = (a,b) => {
    if (b == 0) return a;
    return GreatestCommonDenominator(b, a % b);
}

const LUDecompose = (matrix, n = 26) => {
    if (matrix.length == 0 || matrix.length != matrix[0].length) throw new Error("Input must be a square matrix of non-zero size");

    var size = matrix[0].length;
    var lower = new Array(size).fill(0).map(row => new Array(size).fill(0));
    var upper = new Array(size).fill(0).map(row => new Array(size).fill(0));

    for (var i = 0; i < size; i++) {
        for (var k = i; k < size; k++) {
            var sum = 0;
            for (var j = 0; j < i; j++) {
                sum = (sum + lower[i][j] * upper[j][k]) % n;
            }
            upper[i][k] = ((matrix[i][k] - sum) % n + n) % n;
        }

        for (var k = i; k < size; k++) {
            if (i == k) lower[i][i] = 1;
            else {
                var sum = 0;
                for (var j = 0; j < i; j++) {
                    sum = (sum + lower[k][j] * upper[j][i]) % n;
                }
                lower[k][i] = ModuloDivide(((matrix[k][i] - sum) % n + n) % n, upper[i][i], n);
            }
        }
    }

    return {
        lower: lower,
        upper: upper
    }
}

const ForwardSolve = (upper, y, n) => {
    var size = upper[0].length;
    var sum = 0;
    var b = new Array(size).fill(0);

    for (var i = 0; i < size; i++) {
        sum = y[i];
        for (var j = 0; j < i; j++) {
            sum = ((sum - (upper[j][i] * b[j])) % n + n) % n;
        }
        b[i] = ModuloDivide(sum, upper[i][i], n);
    }

    return b;
}

const BackwardSolve = (lower, b, n) => {
    var size = lower[0].length;
    var tmp;
    var x = new Array(size).fill(0);

    for (var i = size - 1; i >= 0; i--) {
        tmp = b[i];
        for (var j = i + 1; j < size; j++) {
            tmp = ((tmp - (lower[j][i] * x[j])) % n + n) % n;
        }
        x[i] = ModuloDivide(tmp, lower[i][i], n);
    }

    return x;
}

const Determinant = (matrix, m = 26) => {
    if (matrix.length == 0 || matrix.length != matrix[0].length) throw new Error("Input must be a square matrix of non-zero size");

    var matrices = LUDecompose(matrix);
    var upperProduct = Diagonal(matrices.upper).reduce((a, b) => a * b, 1);
    var lowerProduct = Diagonal(matrices.lower).reduce((a, b) => a * b, 1);

    return (upperProduct * lowerProduct) % m;
}

const Diagonal = (matrix) => {
    if (matrix.length == 0 || matrix.length != matrix[0].length) throw new Error("Input must be a square matrix of non-zero size");

    var diagonal = [];
    for (var i = 0; i < matrix.length; i++) diagonal.push(matrix[i][i]);

    return diagonal;
}

export  { ModuloInvert, LUDecompose, ForwardSolve, BackwardSolve, Determinant, GreatestCommonDenominator };
