/**
 * Evaluates a mathematical expression with given variables
 *
 * @param expression - The mathematical expression as a string
 * @param variables - Object containing variable names and their values
 * @returns The evaluated result
 */
// Function to evaluate a mathematical expression
export function evaluateExpression(expression: string, variables: Record<string, number>): number {
    // Replace variable names with their values
    let jsExpression = expression.replace(/\^/g, "**").toLowerCase() // Replace ^ with ** for exponentiation

    // Replace variable names with their values
    for (const [variable, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\b${variable}\\b`, "g")
        jsExpression = jsExpression.replace(regex, value.toString())
    }

    // Use Function constructor to evaluate the expression
    try {
        return Function(...Object.keys(variables), `"use strict"; return ${jsExpression}`)(...Object.values(variables))
    } catch (error) {
        throw new Error(`Error evaluating expression: ${expression}. ${error}`)
    }
}

/**
 * Calculates the numerical derivative of a function at a point
 *
 * Formula: f'(x) ≈ [f(x+h) - f(x-h)] / (2h)
 *
 * @param expression - The function expression as a string
 * @param x - The point at which to calculate the derivative
 * @param h - Step size (default: 0.0001)
 * @returns The approximate derivative value
 */
export function numericalDerivative(expression: string, x: number, h = 0.0001): number {
    const fxPlusH = evaluateExpression(expression, { x: x + h })
    const fxMinusH = evaluateExpression(expression, { x: x - h })
    return (fxPlusH - fxMinusH) / (2 * h)
}

/**
 * Creates a step object for solution steps
 */
export function createStep(
    stepNumber: number,
    description: string,
    formula: string,
    calculation: string,
    result?: string | number,
) {
    return {
        stepNumber,
        description,
        formula,
        calculation,
        result,
    }
}

/**
 * Types for numerical method parameters and solutions
 */
export interface Step {
    stepNumber: number
    description: string
    formula: string
    calculation: string
    result?: string | number
}

export interface Solution {
    title: string
    steps: Step[]
    finalAnswer?: string | number
    iterationTable?: string[][] // Added for tabular data representation
}

/**
 * Format a number to a specified precision with proper handling of small values
 * @param num - The number to format
 * @param precision - Number of decimal places (default: 6)
 */
export function formatNumber(num: number, precision = 6): string {
    // Check if the number is very close to zero
    if (Math.abs(num) < 1e-10) {
        return "0"
    }

    // For very small or very large numbers, use scientific notation
    if (Math.abs(num) < 0.001 || Math.abs(num) > 10000) {
        return num.toExponential(precision)
    }

    // Otherwise use fixed precision
    return num.toFixed(precision)
}

// A helper function to always format numbers in fixed-point notation.
export function customFormatNumber(num: number, precision = 6): string {
    return num.toFixed(precision);
}
