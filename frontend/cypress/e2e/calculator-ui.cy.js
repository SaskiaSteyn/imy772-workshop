describe('Hexadecimal Calculator UI', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display the calculator title', () => {
        cy.contains('h1', 'Hexadecimal Calculator').should('be.visible')
    })

    it('should have all number buttons (0-9, A-F)', () => {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        numbers.forEach(num => {
            cy.contains('button', num).should('have.class', 'btn-number')
        })
    })

    it('should input a hex number when clicking number buttons', () => {
        cy.contains('button', '5').click()
        cy.get('#firstNumber').should('have.value', '5')

        cy.contains('button', 'A').click()
        cy.get('#firstNumber').should('have.value', '5A')
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

    it('should perform addition calculation', () => {
        cy.contains('button', '3').click()
        cy.contains('button', '+').click()
        cy.contains('button', '7').click()
        cy.get('#equalsBtn').click()

        cy.get('#result', { timeout: 5000 }).should('have.value', '000A')
    })
})