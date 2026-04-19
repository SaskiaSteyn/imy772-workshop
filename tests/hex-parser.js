function hexParser(hexString) {

    const regex = /^-?[0-9A-Fa-f]{1,2}(\.[0-9A-Fa-f])?$/;

    if (!regex.test((hexString))) {
        throw new Error('Invalid hexadecimal input');
    }

    let sign = 1;
    let value = hexString;

    if (value.startsWith('-')) {
        sign = -1;
        value = value.slice(1);
    }

    let integerPart = 0;
    let fractionPart = 0;

    if (value.includes('.')) {
        const parts = value.split('.');
        integerPart = parseInt(parts[0], 16);
        const fracDigit = parseInt(parts[1], 16);
        fractionPart = fracDigit / 16;
    }
    else {
        integerPart = parseInt(value, 16);
    }

    return sign * (integerPart + fractionPart);
}

module.exports = hexParser;