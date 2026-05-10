describe('HexCalculator Unit Tests', () => {
    let calculator

    beforeEach(() => {
        // Create a mock DOM before each test
        cy.visit('/')
        cy.window().then((win) => {
            // Get the calculator instance that was created
            calculator = win.calculator
        })
    })

    describe('inputNumber()', () => {
        it('should input a single digit to first number', () => {
            calculator.inputNumber('5')
            expect(calculator.firstNumber).to.equal('5')
        })

        it('should input two hex digits to first number', () => {
            calculator.inputNumber('A')
            calculator.inputNumber('F')
            expect(calculator.firstNumber).to.equal('AF')
        })

        it('should limit first number to 2 digits', () => {
            calculator.inputNumber('1')
            calculator.inputNumber('2')
            calculator.inputNumber('3')
            expect(calculator.firstNumber).to.equal('12')
        })

        it('should input second number after operation is selected', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('add')
            calculator.inputNumber('3')
            expect(calculator.secondNumber).to.equal('3')
        })

        it('should limit second number to 2 digits', () => {
            calculator.inputNumber('F')
            calculator.selectOperation('multiply')
            calculator.inputNumber('1')
            calculator.inputNumber('2')
            calculator.inputNumber('3')
            expect(calculator.secondNumber).to.equal('12')
        })

        it('should reset first number when shouldResetDisplay is true', () => {
            calculator.inputNumber('5')
            calculator.shouldResetDisplay = true
            calculator.inputNumber('7')
            expect(calculator.firstNumber).to.equal('7')
        })
    })

    describe('selectOperation()', () => {
        it('should not select operation if first number is empty', () => {
            calculator.selectOperation('add')
            expect(calculator.operation).to.be.null
        })

        it('should select an operation', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('add')
            expect(calculator.operation).to.equal('add')
        })

        it('should set shouldResetDisplay to true', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('subtract')
            expect(calculator.shouldResetDisplay).to.be.true
        })

        it('should support all operations', () => {
            calculator.inputNumber('A')

            calculator.selectOperation('add')
            expect(calculator.operation).to.equal('add')

            calculator.firstNumber = 'B'
            calculator.selectOperation('subtract')
            expect(calculator.operation).to.equal('subtract')

            calculator.firstNumber = 'C'
            calculator.selectOperation('multiply')
            expect(calculator.operation).to.equal('multiply')

            calculator.firstNumber = 'D'
            calculator.selectOperation('divide')
            expect(calculator.operation).to.equal('divide')
        })
    })

    describe('delete()', () => {
        it('should delete last digit from first number', () => {
            calculator.inputNumber('1')
            calculator.inputNumber('2')
            expect(calculator.firstNumber).to.equal('12')

            calculator.delete()
            expect(calculator.firstNumber).to.equal('1')
        })

        it('should delete last digit from second number', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('add')
            calculator.inputNumber('7')
            calculator.inputNumber('8')
            expect(calculator.secondNumber).to.equal('78')

            calculator.delete()
            expect(calculator.secondNumber).to.equal('7')
        })

        it('should handle deleting from empty string', () => {
            calculator.delete()
            expect(calculator.firstNumber).to.equal('')
        })

        it('should delete all digits one by one', () => {
            calculator.inputNumber('A')
            calculator.inputNumber('B')

            calculator.delete()
            expect(calculator.firstNumber).to.equal('A')

            calculator.delete()
            expect(calculator.firstNumber).to.equal('')
        })
    })

    describe('clear()', () => {
        it('should clear all values', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('add')
            calculator.inputNumber('3')
            calculator.result = { hex: '08', decimal: 8 }

            calculator.clear()

            expect(calculator.firstNumber).to.equal('')
            expect(calculator.secondNumber).to.equal('')
            expect(calculator.operation).to.be.null
            expect(calculator.result).to.be.null
            expect(calculator.shouldResetDisplay).to.be.false
        })

        it('should clear even if only first number exists', () => {
            calculator.inputNumber('F')
            calculator.clear()
            expect(calculator.firstNumber).to.equal('')
        })

        it('should reset shouldResetDisplay flag', () => {
            calculator.shouldResetDisplay = true
            calculator.clear()
            expect(calculator.shouldResetDisplay).to.be.false
        })
    })

    describe('State Management', () => {
        it('should initialize with empty state', () => {
            // Create fresh calculator by reloading page
            cy.reload()
            cy.window().then((win) => {
                const freshCalculator = win.calculator
                expect(freshCalculator.firstNumber).to.equal('')
                expect(freshCalculator.secondNumber).to.equal('')
                expect(freshCalculator.operation).to.be.null
                expect(freshCalculator.result).to.be.null
                expect(freshCalculator.shouldResetDisplay).to.be.false
            })
        })

        it('should maintain state through multiple operations', () => {
            calculator.inputNumber('A')
            expect(calculator.firstNumber).to.equal('A')

            calculator.selectOperation('add')
            expect(calculator.operation).to.equal('add')
            expect(calculator.firstNumber).to.equal('A')

            calculator.inputNumber('5')
            expect(calculator.secondNumber).to.equal('5')
            expect(calculator.firstNumber).to.equal('A')
        })

        it('should properly sequence: input -> operation -> input -> clear', () => {
            calculator.inputNumber('F')
            calculator.selectOperation('multiply')
            calculator.inputNumber('2')

            expect(calculator.firstNumber).to.equal('F')
            expect(calculator.operation).to.equal('multiply')
            expect(calculator.secondNumber).to.equal('2')

            calculator.clear()
            expect(calculator.firstNumber).to.equal('')
            expect(calculator.operation).to.be.null
            expect(calculator.secondNumber).to.equal('')
        })
    })

    describe('updateDisplay()', () => {
        it('should update DOM elements', () => {
            calculator.inputNumber('3')
            calculator.inputNumber('C')

            cy.get('#firstNumber').should('have.value', '3C')
        })

        it('should display operation symbol', () => {
            calculator.inputNumber('5')
            calculator.selectOperation('add')

            cy.get('#operation').should('contain', '+')
        })

        it('should update result display when result is set', () => {
            calculator.result = { hex: '10', decimal: 16 }
            calculator.updateDisplay()

            cy.get('#result').should('have.value', '10')
            cy.get('#decimalInfo').should('contain', 'Decimal: 16')
        })

        it('should clear result display when result is null', () => {
            calculator.result = null
            calculator.updateDisplay()

            cy.get('#result').should('have.value', '')
            cy.get('#decimalInfo').should('be.empty')
        })
    })

    describe('Edge Cases', () => {
        it('should handle uppercase hex digits', () => {
            calculator.inputNumber('A')
            calculator.inputNumber('F')
            expect(calculator.firstNumber).to.equal('AF')
        })

        it('should handle F (15 in decimal)', () => {
            calculator.inputNumber('F')
            expect(calculator.firstNumber).to.equal('F')
        })

        it('should handle 0 as valid input', () => {
            calculator.inputNumber('0')
            expect(calculator.firstNumber).to.equal('0')
        })

        it('should not lose state during rapid operations', () => {
            calculator.inputNumber('1')
            calculator.inputNumber('2')
            calculator.selectOperation('add')
            calculator.inputNumber('3')
            calculator.delete()

            expect(calculator.firstNumber).to.equal('12')
            expect(calculator.operation).to.equal('add')
            expect(calculator.secondNumber).to.equal('')
        })
    })
})