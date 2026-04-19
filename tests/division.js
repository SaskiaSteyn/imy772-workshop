function division(a, b) {
    const valueA = parseInt(a, 16)
    const valueB = parseInt(b, 16)

    let result = valueA / valueB

    if (valueB === 0) {
        return '0000'
    }

    result = Math.round(result)

    if (result < 0) {
        return '0000'
    }

    return result.toString(16).toUpperCase().padStart(4, '0')
}

module.exports = division