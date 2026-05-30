const express = require('express')
const path = require('path')
const addition = require('./operations/addition')
const subtraction = require('./operations/subtraction')
const multiplication = require('./operations/multiplication')
const division = require('./operations/division')
const hexToDecimal = require('./utils/hex-to-decimal')

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

// API Routes
app.post('/api/calculate', (req, res) => {
    try {
        const { operation, a, b } = req.body

        if (!operation || !a || b === undefined) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        let result
        switch (operation) {
            case 'add':
                result = addition(a, b)
                break
            case 'subtract':
                result = subtraction(a, b)
                break
            case 'multiply':
                result = multiplication(a, b)
                break
            case 'divide':
                result = division(a, b)
                break
            default:
                return res.status(400).json({ error: 'Invalid operation' })
        }

        const decimalResult = hexToDecimal(result)

        res.json({
            hex: result,
            decimal: decimalResult
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Calculator server running on http://localhost:${PORT}`)
})
