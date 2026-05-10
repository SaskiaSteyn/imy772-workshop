describe('HexCalculator Unit Tests', () => {
    let calculator

    beforeEach(() => {
        cy.visit('/')
        cy.window().then((win) => {
            calculator = win.calculator
        })
    })

    describe('inputNumber()', () => {
        it('should input a single digit to the first field', () => {
            calculator.inputNumber('5')
            expect(calculator.firstNumber).to.equal('5')
        })
    })

    it('should input two hex digits to first number', () => {
        calculator.inputNumber('A')
        calculator.inputNumber('F')
        expect(calculator.firstNumber).to.equal('AF')
    })
})

