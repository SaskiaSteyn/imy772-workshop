const addition = require('./addition');

describe('Addition Function', () => {

    test('Adds 8 (hex) and 5 (hex) to equal 000D (hex)', () => {
        expect(addition('8', '5')).toBe('000D');
    });

    test('Adds FF (hex) and FF (hex) to equal 01FE (hex)', () => {
        expect(addition('FF', 'FF')).toBe('01FE');
    });

    test('Adds 20 (hex) and 20 (hex) to equal 0040 (hex)', () => {
        expect(addition('20', '20')).toBe('0040');
    });

    test('Adds 99 (hex) and 99 (hex) to equal 0132 (hex)', () => {
        expect(addition('99', '99')).toBe('0132');
    });

});