
const InvertMod = (input, modulo) => {
    if (!FindCoprimesSmallerThan(modulo).includes(input)) throw new Error("The input must be a coprime of the modulo");

    var inv = 0;
    while((input * inv) % modulo != 1) inv = inv + 1;
    return inv;
}

const FindCoprimesSmallerThan = (n) => {
    var coprimes = [];
    var primeFactorsOfN = FindPrimeFactors(n);

    for (var i = 1; i < n; i++)
    {
        var primeFactors = FindPrimeFactors(i);
        if (primeFactors.filter(value => primeFactorsOfN.includes(value)).length == 0) coprimes.push(i);
    }

    return coprimes;
}

const FindPrimeFactors = (n) => {
    var primeFactors = []

    for (var i = 2; i*i <= n; i++)
    {
        while (n % i == 0)
        {
            primeFactors.push(i);
            n = n / i;
        }
    }

    if (n > 1) primeFactors.push(n);
    return primeFactors;
}

const LUDecompose = (matrix, n = 26) => {
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
            tmp = ((tmp - (lower[j][i] * b[j])) % n + n) % n;
        }
        x[i] = ModuloDivide(tmp, lower[i][i], n);
    }

    return x;
}



const ModuloDivide = (a, b, m) => {
    return ((a % m) * (ModuloInvert(b, m) % m)) % m;
}

const ModuloInvert = (a, m) => {
    var inv = 0;
    while ((a * inv) % m != 1) inv = inv + 1;
    return inv;
}

export  { InvertMod, LUDecompose, ForwardSolve, BackwardSolve };
