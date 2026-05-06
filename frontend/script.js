class HexCalculator {
    constructor() {
        this.firstNumber = ''
        this.secondNumber = ''
        this.operation = null
        this.result = null
        this.shouldResetDisplay = false

        this.setupEventListeners()
        this.updateDisplay()
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn-number').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.value)
            })
        })

        // Operation buttons
        document.querySelectorAll('.btn-operation').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOperation(e.target.dataset.operation)
            })
        })

        // Control buttons
        document.getElementById('clearBtn').addEventListener('click', () => this.clear())
        document.getElementById('deleteBtn').addEventListener('click', () => this.delete())
        document.getElementById('equalsBtn').addEventListener('click', () => this.calculate())
    }

    inputNumber(value) {
        // Limit to 2 hex digits per number
        if (this.operation === null) {
            // First number
            if (this.shouldResetDisplay) {
                this.firstNumber = value
                this.shouldResetDisplay = false
            } else if (this.firstNumber.length < 2) {
                this.firstNumber += value
            }
        } else {
            // Second number
            if (this.secondNumber.length < 2) {
                this.secondNumber += value
                this.shouldResetDisplay = false
            }
        }
        this.updateDisplay()
    }

    selectOperation(op) {
        if (this.firstNumber === '') return

        if (this.secondNumber !== '') {
            // If there's already a second number, calculate first
            this.calculate()
        }

        this.operation = op
        this.shouldResetDisplay = true
        this.updateDisplay()
    }

    async calculate() {
        if (this.firstNumber === '' || this.operation === null || this.secondNumber === '') {
            return
        }

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    operation: this.operation,
                    a: this.firstNumber,
                    b: this.secondNumber
                })
            })

            if (!response.ok) {
                throw new Error('Calculation failed')
            }

            const data = await response.json()
            this.result = data
            this.firstNumber = ''
            this.secondNumber = ''
            this.operation = null
            this.shouldResetDisplay = true
            this.updateDisplay()
        } catch (error) {
            console.error('Error:', error)
            alert('Calculation error: ' + error.message)
        }
    }

    delete() {
        if (this.operation === null) {
            // Delete from first number
            this.firstNumber = this.firstNumber.slice(0, -1)
        } else {
            // Delete from second number
            this.secondNumber = this.secondNumber.slice(0, -1)
        }
        this.updateDisplay()
    }

    clear() {
        this.firstNumber = ''
        this.secondNumber = ''
        this.operation = null
        this.result = null
        this.shouldResetDisplay = false
        this.updateDisplay()
    }

    updateDisplay() {
        document.getElementById('firstNumber').value = this.firstNumber
        document.getElementById('secondNumber').value = this.secondNumber

        // Update operation display
        const operationSymbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        }
        document.getElementById('operation').textContent = this.operation ? operationSymbols[this.operation] : ''

        // Update result display
        if (this.result) {
            document.getElementById('result').value = this.result.hex
            document.getElementById('decimalInfo').textContent = `Decimal: ${this.result.decimal}`
        } else {
            document.getElementById('result').value = ''
            document.getElementById('decimalInfo').textContent = ''
        }
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HexCalculator()
})
