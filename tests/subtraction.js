function subtraction(a, b) {
    const valueA = parseInt(a, 16)
    const valueB = parseInt(b, 16)

    let result = valueA - valueB

    if (result < 0) {
        result = 0
    }

    return result.toString(16).toUpperCase().padStart(4, '0')
}

module.exports = subtraction