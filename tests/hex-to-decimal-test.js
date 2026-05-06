const hex_to_decimal = require('./hex-to-decimal')

describe('Hex to Decimal Function', () => {
    test('converts 0A (hex) to 10 (decimal)', () => {
        expect(hex_to_decimal('0A')).toBe('10')
    })

    test('converts FF (hex) to 255 (decimal)', () => {
        expect(hex_to_decimal('FF')).toBe('255')
    })

    test('converts 10 (hex) to 16 (decimal)', () => {
        expect(hex_to_decimal('10')).toBe('16')
    })

    test('converts 0000 (hex) to 0 (decimal)', () => {
        expect(hex_to_decimal('0000')).toBe('0')
    })
})