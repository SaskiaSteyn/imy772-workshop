# Functional Requirements

Functional requirements define what an application must do, outlining specific actions, behaviors, and data processing tasks. They are helpful to ensure the application meets the stakeholder's goals. In our case, the stakeholder has given us the following requirements as their goal:

> "The calculator application should be able to perform basic arithmetic functions (addition, subtraction, multiplication and division) on a set of hexadecimal numbers. The calculator's only restriction is that it will accept inputs up to 2 digits, return answers up to 4 digits, and not return any negative answers or answers with decimal places. (Note that you can do all these on the client side, but for the sake of this assignment, make sure the code under the hood supports this as well.)"

Let's break down the requirements to identify the functional requirements:

---

## Requirement 1 — Basic Arithmetic

> "The calculator application should be able to perform basic arithmetic functions"

This is the core of the application. It is a calculator app. What does the application calculate? Basic arithmetic between hexadecimal numbers. This is our first main functional requirement.

We can break it down into smaller requirements: the calculator does addition, subtraction, multiplication, and division. The calculations are limited to inputs up to 2 digits and outputs of 4 digits.

---

## Requirement 2 — Output Restrictions

> "The calculator’s only restriction is that it will accept inputs up to 2 digits, return answers up to 4 digits, and not return any negative answers or answers with decimal places."

The first half of this sentence was identified as part of the first functional requirement, because it outlines what is being calculated. The second part of this sentence identifies the limitations we need to enforce in the application.

The application must not return any negative numbers. There will be cases where an arithmetic operation could return a negative number, so we need to create a requirement to prevent it. We are going to design the application to force any calculation that would result in a negative number to return `0` instead.

The second half of this requirement is the limitation on decimals. We could round down, round up, or both. We are going to design the system to round down when the output has a decimal less than `.5` and round up when the decimal is equal to and greater than `.5`.

---

## Requirement 3 — Hexadecimal Conversion

Lastly, we need to address that this calculator application is dealing with hexadecimal numbers. The average person may not understand the hexadecimal numeral system. The hexadecimal system is a base-16 numeral system and the decimal system is base-10. We need to design the system to make it easy to understand for everyone. We are going to design the system to convert the hexadecimal inputs to and from decimal numbers as well as converting the hexadecimal output to the decimal system.

---

## Implementation Note

> "(Note that you can do all these on the client side, but for the sake of this assignment, make sure the code under the hood supports this as well.)"

This last part of the requirements is not something we can define as a functional requirement. It is an instruction for where to write the logic of the application. Later in this tutorial, we will be creating the logic of the system in the frontend and the backend. To keep the system as simple as possible, we will be using a basic HTML page with CSS markup and JavaScript for the application logic.

---

## Summary of Functional Requirements

1. **Do basic arithmetic operations with hexadecimal numbers**
   - Perform addition with hexadecimal numbers
   - Perform subtraction with hexadecimal numbers
   - Perform multiplication with hexadecimal numbers
   - Perform division with hexadecimal numbers

2. **Limit input and output size**
   - Limit the size of input numbers to 2 hexadecimal digits
   - Limit the size of output numbers to 4 hexadecimal digits

3. **Output is restricted to positive whole numbers only**
   - Negative numbers will be changed to `0`
   - Decimal numbers will be rounded to the nearest whole number
     - Decimals `< 0.5` will be rounded down
     - Decimals `>= 0.5` will be rounded up

4. **Convert between hexadecimal and decimal**
   - Convert decimal inputs to hexadecimal
   - Convert hexadecimal outputs to decimal
