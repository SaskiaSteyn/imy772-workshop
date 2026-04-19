const addition = require('./addition');
const subtraction = require('./subtraction');
const multiplication = require('./multiplication');
const division = require('./division');

describe('Validation tests', () => {

    const isValidHex = (str) => /^[0-9A-F]{1,4}$/i.test(str);

    describe('Input Validation: two valid hex inputs', () => {
        const testValid = (fn, inputs) => {
            expect(() => fn(...inputs)).not.toThrow();
        }

        const testInvalid = (fn, inputs) => {
            expect(() => fn(...inputs)).toThrow();
        }

        describe('Addition', () => {
            test('Testing valid inputs', () => {
                testValid(addition, ['1', '2']);
                testValid(addition, ['-02', '-FF']);
                testValid(addition, ['2.F', '3.1']);
                testValid(addition, ['-A.F', 'B.0']);
                testValid(addition, ['0', '0']);
            })

            test('Testing invalid inputs', () => {
                testInvalid(addition, ['G', '5']);
                testInvalid(addition, ['-', '5']);
                testInvalid(addition, ['2..3', '5']);
                testInvalid(addition, ['2.', '5']);
                testInvalid(addition, ['.F', '5']);
                testInvalid(addition, ['-2.F.5', '5']);
                testInvalid(addition, ['2.FF', '5']);
            });
        });

        describe('Subtraction', () => {
            test('Testing valid inputs', () => {
                testValid(subtraction, ['1', '2']);
                testValid(subtraction, ['-02', '-FF']);
                testValid(subtraction, ['2.F', '3.1']);
                testValid(subtraction, ['-A.F', 'B.0']);
                testValid(subtraction, ['0', '0']);
            })

            test('Testing invalid inputs', () => {
                testInvalid(subtraction, ['G', '5']);
                testInvalid(subtraction, ['-', '5']);
                testInvalid(subtraction, ['2..3', '5']);
                testInvalid(subtraction, ['2.', '5']);
                testInvalid(subtraction, ['.F', '5']);
                testInvalid(subtraction, ['-2.F.5', '5']);
                testInvalid(subtraction, ['2.FF', '5']);
            });
        });

        describe('Multiplication', () => {
            test('Testing valid inputs', () => {
                testValid(multiplication, ['1', '2']);
                testValid(multiplication, ['-02', '-FF']);
                testValid(multiplication, ['2.F', '3.1']);
                testValid(multiplication, ['-A.F', 'B.0']);
                testValid(multiplication, ['0', '0']);
            })

            test('Testing invalid inputs', () => {
                testInvalid(multiplication, ['G', '5']);
                testInvalid(multiplication, ['-', '5']);
                testInvalid(multiplication, ['2..3', '5']);
                testInvalid(multiplication, ['2.', '5']);
                testInvalid(multiplication, ['.F', '5']);
                testInvalid(multiplication, ['-2.F.5', '5']);
                testInvalid(multiplication, ['2.FF', '5']);
            });
        });

        describe('Division', () => {
            test('Testing valid inputs', () => {
                testValid(division, ['1', '2']);
                testValid(division, ['-02', '-FF']);
                testValid(division, ['2.F', '3.1']);
                testValid(division, ['-A.F', 'B.0']);
                testValid(division, ['0', '0']);
            })

            test('Testing invalid inputs', () => {
                testInvalid(division, ['G', '5']);
                testInvalid(division, ['-', '5']);
                testInvalid(division, ['2..3', '5']);
                testInvalid(division, ['2.', '5']);
                testInvalid(division, ['.F', '5']);
                testInvalid(division, ['-2.F.5', '5']);
                testInvalid(division, ['2.FF', '5']);
            });
        });
    });

    describe('Output validation: no negative numbers', () => {

        test('Addition', () => {
            const result = addition('-02', '-FF');
            expect(result).toBe('0000');
        });

        test('Subtraction', () => {
            const result = subtraction('-FF', '-02');
            expect(result).toBe('0000');
        });

        test('Multiplication', () => {
            const result = multiplication('-2', '3');
            expect(result).toBe('0000');
        });

        test('Division', () => {
            const result = division('-8F', '2');;
            expect(result).toBe('0000');
        });

    });

    describe('Output validation: no decimal values', () => {
        test('Addition', () => {
            const result = addition('2.F', '1.1');
            expect(result).toBe('0004');
        });

        test('Subtraction', () => {
            const result = subtraction('3.0', '1.8');
            expect(result).toBe('0002');
        });

        test('Multiplication', () => {
            const result = multiplication('2.0', '1.8');
            expect(result).toBe('0003');
        });

        test('Division', () => {
            const result = division('0F', '02');
            expect(result).toBe('0008');
        });
    });

});