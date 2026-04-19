const hexParser = require('./hex-parser');

function subtraction(a, b) {
    const decimalA = hexParser(a);
    const decimalB = hexParser(b);

    let result = decimalA - decimalB;

    result = Math.round(result)

    if (result < 0) {
        result = 0
    }

    return result.toString(16).toUpperCase().padStart(4, '0')
}

module.exports = subtraction