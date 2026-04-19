const multiplication = require('./multiplication');

describe('Multiplication Function', () => {

    test('Multiplies 8 (hex) and 5 (hex) to equal 0028 (hex)', () => {
        expect(multiplication('8', '5')).toBe('0028');
    });

    test('Multiplies FF (hex) and FF (hex) to equal FE01 (hex)', () => {
        expect(multiplication('FF', 'FF')).toBe('FE01');
    });

    test('Multiplies 20 (hex) and 20 (hex) to equal 0400 (hex)', () => {
        expect(multiplication('20', '20')).toBe('0400');
    });

    test('Multiplies 99 (hex) and 99 (hex) to equal 5B71 (hex)', () => {
        expect(multiplication('99', '99')).toBe('5B71');
    });
});