describe('Hexadecimal Calculator UI', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display the calculator title', () => {
        cy.contains('h1', 'Hexadecimal Calculator').should('be.visible')
    })

    it('should have all required input fields', () => {
        cy.get('#firstNumber').should('exist')
        cy.get('#secondNumber').should('exist')
        cy.get('#result').should('exist')
    })

    it('should have all number buttons (0-9, A-F)', () => {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        numbers.forEach(num => {
            cy.contains('button', num).should('have.class', 'btn-number')
        })
    })

    it('should have all operation buttons', () => {
        cy.contains('button', '+').should('have.class', 'btn-operation')
        cy.contains('button', '−').should('have.class', 'btn-operation')
        cy.contains('button', '×').should('have.class', 'btn-operation')
        cy.contains('button', '÷').should('have.class', 'btn-operation')
    })

    it('should have control buttons', () => {
        cy.get('#clearBtn').should('exist').and('contain', 'Clear')
        cy.get('#deleteBtn').should('exist').and('contain', 'Delete')
        cy.get('#equalsBtn').should('exist').and('contain', '=')
    })

    it('should input a hex number when clicking number buttons', () => {
        cy.contains('button', '5').click()
        cy.get('#firstNumber').should('have.value', '5')

        cy.contains('button', 'A').click()
        cy.get('#firstNumber').should('have.value', '5A')
    })

    it('should limit first number to 2 hex digits', () => {
        cy.contains('button', '1').click()
        cy.contains('button', '2').click()
        cy.contains('button', '3').click()

        // Should only show '12', not '123'
        cy.get('#firstNumber').should('have.value', '12')
    })

    it('should select an operation', () => {
        cy.contains('button', 'A').click()
        cy.contains('button', '+').click()

        cy.get('#operation').should('contain', '+')
    })

    it('should input second number after operation', () => {
        cy.contains('button', 'F').click()
        cy.contains('button', '+').click()
        cy.contains('button', '5').click()

        cy.get('#secondNumber').should('have.value', '5')
    })

    it('should clear all inputs when Clear button is clicked', () => {
        cy.contains('button', '3').click()
        cy.contains('button', '+').click()
        cy.contains('button', '7').click()

        cy.get('#firstNumber').should('have.value', '3')
        cy.get('#operation').should('contain', '+')
        cy.get('#secondNumber').should('have.value', '7')

        cy.get('#clearBtn').click()

        cy.get('#firstNumber').should('have.value', '')
        cy.get('#operation').should('be.empty')
        cy.get('#secondNumber').should('have.value', '')
        cy.get('#result').should('have.value', '')
    })

    it('should delete the last digit when Delete button is clicked', () => {
        cy.contains('button', '1').click()
        cy.contains('button', '2').click()
        cy.contains('button', '3').click()

        cy.get('#firstNumber').should('have.value', '12')

        cy.get('#deleteBtn').click()
        cy.get('#firstNumber').should('have.value', '1')

        cy.get('#deleteBtn').click()
        cy.get('#firstNumber').should('have.value', '')
    })

    it('should perform addition calculation', () => {
        cy.contains('button', '5').click()
        cy.contains('button', '+').click()
        cy.contains('button', '3').click()
        cy.get('#equalsBtn').click()

        // Wait for the API call to complete
        cy.get('#result', { timeout: 5000 }).should('not.have.value', '')
    })

    it('should perform subtraction calculation', () => {
        cy.contains('button', 'A').click()
        cy.contains('button', '−').click()
        cy.contains('button', '5').click()
        cy.get('#equalsBtn').click()

        cy.get('#result', { timeout: 5000 }).should('not.have.value', '')
    })

    it('should perform multiplication calculation', () => {
        cy.contains('button', '4').click()
        cy.contains('button', '×').click()
        cy.contains('button', '2').click()
        cy.get('#equalsBtn').click()

        cy.get('#result', { timeout: 5000 }).should('not.have.value', '')
    })

    it('should perform division calculation', () => {
        cy.contains('button', '8').click()
        cy.contains('button', '÷').click()
        cy.contains('button', '2').click()
        cy.get('#equalsBtn').click()

        cy.get('#result', { timeout: 5000 }).should('not.have.value', '')
    })

    it('should display decimal equivalent of hex numbers', () => {
        cy.contains('button', '5').click()
        cy.contains('button', '+').click()
        cy.contains('button', '3').click()
        cy.get('#equalsBtn').click()

        cy.get('#decimalInfo', { timeout: 5000 }).should('contain', 'Decimal:')
    })

    it('should allow chaining operations', () => {
        cy.contains('button', '2').click()
        cy.contains('button', '+').click()
        cy.contains('button', '3').click()
        cy.contains('button', '×').click()

        // After clicking an operation on a second number, it should calculate first
        cy.get('#result', { timeout: 5000 }).should('not.have.value', '')
    })
})