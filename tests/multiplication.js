function multiplication(a, b) {

    const decimalA = parseInt(a, 16);
    const decimalB = parseInt(b, 16);

    const result = decimalA * decimalB;

    return result.toString(16).toUpperCase().padStart(4, '0');
};

module.exports = multiplication;