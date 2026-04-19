const addition = require('./addition');
const subtraction = require('./subtraction');
const multiplication = require('./multiplication');
const division = require('./division');

describe('Validation Tests - All Functions', () => {

    const isValidHexOutput = (str) => /^[0-9A-F]{1,4}$/i.test(str);

    describe('Input validation: two valid hex numbers (allow negative & decimal)', () => {

        const testValid = (fn, inputs) => {
            expect(() => fn(...inputs)).not.toThrow();
        };
        const testInvalid = (fn, inputs) => {
            expect(() => fn(...inputs)).toThrow();
        };

        // ADDITION
        describe('addition', () => {
            test('Positive: accepts valid inputs (positive, negative, decimal)', () => {
                testValid(addition, ['2', '3']);
                testValid(addition, ['-02', '-FF']);
                testValid(addition, ['2.F', '3.1']);
                testValid(addition, ['-A.F', 'B.0']);
                testValid(addition, ['0', '-0']);
            });

            test('Negative: rejects invalid formats', () => {
                testInvalid(addition, ['G', '5']);          // non-hex
                testInvalid(addition, ['-', '5']);          // sign without digits
                testInvalid(addition, ['2..3', '4']);       // multiple decimals
                testInvalid(addition, ['.', '4']);          // only decimals
                testInvalid(addition, ['2.', '4']);         // decimal without trailing digit
                testInvalid(addition, ['.F', '4']);         // missing leading digit
                testInvalid(addition, ['-2.F.5', '4']);     // too many parts
                testInvalid(addition, ['2.FF', '4']);       // more than one digit after decimal
            });
        });

        // SUBTRACTION
        describe('subtraction', () => {
            test('Positive: accepts valid inputs (positive, negative, decimal)', () => {
                testValid(subtraction, ['2', '3']);
                testValid(subtraction, ['-02', '-FF']);
                testValid(subtraction, ['2.F', '3.1']);
                testValid(subtraction, ['-A.F', 'B.0']);
                testValid(subtraction, ['0', '-0']);
            });

            test('Negative: rejects invalid formats', () => {
                testInvalid(subtraction, ['G', '5']);          // non-hex
                testInvalid(subtraction, ['-', '5']);          // sign without digits
                testInvalid(subtraction, ['2..3', '4']);       // multiple decimals
                testInvalid(subtraction, ['.', '4']);          // only decimals
                testInvalid(subtraction, ['2.', '4']);         // decimal without trailing digit
                testInvalid(subtraction, ['.F', '4']);         // missing leading digit
                testInvalid(subtraction, ['-2.F.5', '4']);     // too many parts
                testInvalid(subtraction, ['2.FF', '4']);       // more than one digit after decimal
            });
        });

        // MULTIPLICATION
        describe('multiplication', () => {
            test('Positive: accepts valid inputs (positive, negative, decimal)', () => {
                testValid(multiplication, ['2', '3']);
                testValid(multiplication, ['-02', '-FF']);
                testValid(multiplication, ['2.F', '3.1']);
                testValid(multiplication, ['-A.F', 'B.0']);
                testValid(multiplication, ['0', '-0']);
            });

            test('Negative: rejects invalid formats', () => {
                testInvalid(multiplication, ['G', '5']);          // non-hex
                testInvalid(multiplication, ['-', '5']);          // sign without digits
                testInvalid(multiplication, ['2..3', '4']);       // multiple decimals
                testInvalid(multiplication, ['.', '4']);          // only decimals
                testInvalid(multiplication, ['2.', '4']);         // decimal without trailing digit
                testInvalid(multiplication, ['.F', '4']);         // missing leading digit
                testInvalid(multiplication, ['-2.F.5', '4']);     // too many parts
                testInvalid(multiplication, ['2.FF', '4']);       // more than one digit after decimal
            });
        });

        // DIVISION
        describe('division', () => {
            test('Positive: accepts valid inputs (positive, negative, decimal)', () => {
                testValid(division, ['2', '3']);
                testValid(division, ['-02', '-FF']);
                testValid(division, ['2.F', '3.1']);
                testValid(division, ['-A.F', 'B.0']);
                testValid(division, ['0', '-0']);
            });

            test('Negative: rejects invalid formats', () => {
                testInvalid(division, ['G', '5']);          // non-hex
                testInvalid(division, ['-', '5']);          // sign without digits
                testInvalid(division, ['2..3', '4']);       // multiple decimals
                testInvalid(division, ['.', '4']);          // only decimals
                testInvalid(division, ['2.', '4']);         // decimal without trailing digit
                testInvalid(division, ['.F', '4']);         // missing leading digit
                testInvalid(division, ['-2.F.5', '4']);     // too many parts
                testInvalid(division, ['2.FF', '4']);       // more than one digit after decimal
            });
        });

    });

    describe('Output validation: no negative values', () => {

        test('addition: -02 + -FF = -101 -> "0000"', () => {
            const result = addition('-02', '-FF');
            expect(result).toBe('0000');
        });

        test('subtraction: 5 - A = -5 -> "0000"', () => {
            const result = subtraction('5', 'A');
            expect(result).toBe('0000');
        });

        test('multiplication: -2 * 3 = -6 -> "0000"', () => {
            const result = multiplication('-2', '3');
            expect(result).toBe('0000');
        });

        test('division: -0F / 02 = -7.5 -> rounds to -8 -> negative, so "0000"', () => {
            const result = division('-0F', '02');
            expect(result).toBe('0000');
        });
    });

    describe('Output validation: no decimals', () => {
        test('addition: 2.F + 1.1 = 4.0 decimal -> rounded to 4 → "0004" (no decimal)', () => {
            const result = addition('2.F', '1.1');
            expect(result).not.toContain('.');
            expect(result).toMatch(/^[0-9A-F]{4}$/);
            expect(result).toBe('0004');
        });

        test('subtraction: 3.0 - 1.8 = 1.5 decimal -> rounded to 2 → "0002" (no decimal)', () => {
            const result = subtraction('3.0', '1.8');
            expect(result).not.toContain('.');
            expect(result).toMatch(/^[0-9A-F]{4}$/);
            expect(result).toBe('0002');
        });

        test('multiplication: 2.0 * 1.8 = 3.0 decimal -> "0003" (no decimal)', () => {
            const result = multiplication('2.0', '1.8');
            expect(result).not.toContain('.');
            expect(result).toMatch(/^[0-9A-F]{4}$/);
            expect(result).toBe('0003');
        });

        test('division: 0F / 02 = 7.5 decimal -> rounded to 8 -> "0008" (no decimal)', () => {
            const result = division('0F', '02');
            expect(result).not.toContain('.');
            expect(result).toMatch(/^[0-9A-F]{4}$/);
            expect(result).toBe('0008');
        });
    });

});