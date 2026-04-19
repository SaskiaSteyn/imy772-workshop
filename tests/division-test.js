const division = require('./division')

describe('Division Function', () => {
    test('divides 10 (hex) by 02 (hex) to equal 0008 (hex)', () => {
        expect(division('10', '02')).toBe('0008')
    })

    test('divides 05 (hex) by 00 (hex) returns 0000 (hex)', () => {
        expect(division('05', '00')).toBe('0000')
    })

    test('divides 09 (hex) by 02 (hex) to equal 0005 (hex)', () => {
        expect(division('09', '02')).toBe('0005')
    })

    test('divides FF (hex) by 10 (hex) to equal 0010 (hex)', () => {
        expect(division('FF', '10')).toBe('0010')
    })

    test('divides 20 (hex) by 04 (hex) to equal 0008 (hex)', () => {
        expect(division('20', '04')).toBe('0008')
    })

    test('divides 0F (hex) by 02 (hex) to equal 0008 (hex, rounds 7.5 up)', () => {
        expect(division('0F', '02')).toBe('0008')
    })

    test('divides 0A (hex) by 03 (hex) to equal 0003 (hex, rounds 3.333 down)', () => {
        expect(division('0A', '03')).toBe('0003')
    })

    test('divides 10 (hex) by 01 (hex) to equal 0010 (hex, identity: divide by 1)', () => {
        expect(division('10', '01')).toBe('0010')
    })

    test('divides 00 (hex) by 05 (hex) to equal 0000 (hex, edge case: zero divided by something)', () => {
        expect(division('00', '05')).toBe('0000')
    })

    test('divides 10 (hex) by 10 (hex) to equal 0001 (hex, edge case: divide by itself)', () => {
        expect(division('10', '10')).toBe('0001')
    })

    test('divides 07 (hex) by 02 (hex) to equal 0004 (hex, rounds 3.5 up)', () => {
        expect(division('07', '02')).toBe('0004')
    })

    test('divides ff (hex) by 10 (hex) mixed case to equal 0010 (hex, case insensitivity)', () => {
        expect(division('ff', '10')).toBe('0010')
    })
})