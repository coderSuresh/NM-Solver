import { bisection } from "./numerical-methods/root-finding/bisection"
import { falsePosition } from "./numerical-methods/root-finding/false-position"
import { newtonRaphson } from "./numerical-methods/root-finding/newton-raphson"
import { secantMethod } from "./numerical-methods/root-finding/secant"

// Main function to solve numerical methods
export function solveNumericalMethod(
    method: string,
    params: BisectionParams | NewtonRaphsonParams | SecantMethodParams | Record<string, unknown>
    
) {
    switch (method) {
        case "bisection":
            return bisection(params as BisectionParams)
        case 'false-position':
            return falsePosition(params as BisectionParams)
        case 'secant':
            return secantMethod(params as SecantMethodParams)
        case 'newton-raphson':
            return newtonRaphson(params as NewtonRaphsonParams)
        default:
            throw new Error(`Method ${method} not implemented`)
    }
}
