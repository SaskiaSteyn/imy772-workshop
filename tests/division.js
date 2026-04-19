function division(a, b) {
    // Convert hex inputs to decimal for calculation
    const decimalA = parseInt(a, 16)
    const decimalB = parseInt(b, 16)

    // Prevent division by zero
    if (decimalB === 0) {
        return '0000'
    }

    // Perform division
    let result = decimalA / decimalB

    // Round to nearest whole number: < 0.5 rounds down, >= 0.5 rounds up
    result = Math.round(result)

    // Handle negative numbers - return 0 if result is negative
    if (result < 0) {
        result = 0
    }

    // Convert result back to hexadecimal (uppercase, padded to 4 digits)
    return result.toString(16).toUpperCase().padStart(4, '0')
}

module.exports = division
