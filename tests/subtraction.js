function subtraction(a, b) {
    // Convert hex inputs to decimal for calculation
    const decimalA = parseInt(a, 16)
    const decimalB = parseInt(b, 16)

    // Perform subtraction
    let result = decimalA - decimalB

    // Handle negative numbers - return 0 if result is negative
    if (result < 0) {
        result = 0
    }

    // Convert result back to hexadecimal (uppercase, padded to 4 digits)
    return result.toString(16).toUpperCase().padStart(4, '0')
}

module.exports = subtraction
