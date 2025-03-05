
const InvertMod = (input, modulo) => {
    // Insert a check to see if input is coprime to modulo
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

export default InvertMod;
