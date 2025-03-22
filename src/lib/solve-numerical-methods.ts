import { bisection } from "./numerical-methods/root-finding/bisection"
import { falsePosition } from "./numerical-methods/root-finding/false-position"
import { newtonRaphson } from "./numerical-methods/root-finding/newton-raphson"
import { secantMethod } from "./numerical-methods/root-finding/secant"

// Main function to solve numerical methods
export function solveNumericalMethod(method: string, params: any) {
    switch (method) {
        case "bisection":
            return bisection(params)
        case 'false-position':
            return falsePosition(params)
        case 'secant':
            return secantMethod(params)
        case 'newton-raphson':
            return newtonRaphson(params)
        default:
            throw new Error(`Method ${method} not implemented`)
    }
}
