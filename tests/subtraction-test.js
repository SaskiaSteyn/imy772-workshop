const subtraction = require('./subtraction')

describe('Subtraction Function', () => {
    test('subtracts 10 (hex) - 5 (hex) to equal 000B (hex)', () => {
        expect(subtraction('10', '5')).toBe('000B')
    })

    test('subtracts FF (hex) - 01 (hex) to equal 00FE (hex)', () => {
        expect(subtraction('FF', '01')).toBe('00FE')
    })

    test('subtracts 0F (hex) - 0F (hex) to equal 0000 (hex)', () => {
        expect(subtraction('0F', '0F')).toBe('0000')
    })

    test('subtracts 05 (hex) - 0A (hex) returns 0000 (negative result clamped)', () => {
        expect(subtraction('05', '0A')).toBe('0000')
    })

    test('subtracts 20 (hex) - 10 (hex) to equal 0010 (hex)', () => {
        expect(subtraction('20', '10')).toBe('0010')
    })

    test('subtracts 10 (hex) - 0 (hex) to equal 0010 (hex, edge case: subtract zero)', () => {
        expect(subtraction('10', '0')).toBe('0010')
    })

    test('subtracts 0 (hex) - 0 (hex) to equal 0000 (hex, edge case: zero minus zero)', () => {
        expect(subtraction('0', '0')).toBe('0000')
    })

    test('subtracts 05 (hex) - 00 (hex) to equal 0005 (hex, edge case: subtract zero)', () => {
        expect(subtraction('05', '00')).toBe('0005')
    })

    test('subtracts lowercase f (hex) - 5 (hex) to equal 000A (hex, case insensitivity)', () => {
        expect(subtraction('f', '5')).toBe('000A')
    })

    test('subtracts FF (hex) - ff (hex) mixed case to equal 0000 (hex, case insensitivity)', () => {
        expect(subtraction('FF', 'ff')).toBe('0000')
    })
})
