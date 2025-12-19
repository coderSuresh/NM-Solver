import { bisection } from "./numerical-methods/root-finding/bisection"
import { falsePosition } from "./numerical-methods/root-finding/false-position"
import { newtonRaphson } from "./numerical-methods/root-finding/newton-raphson"
import { secantMethod } from "./numerical-methods/root-finding/secant"
import { gaussElimination } from "./numerical-methods/linear-systems/gauss-elimination"
import { gaussJordan } from "./numerical-methods/linear-systems/gauss-jordan"
import { gaussSeidel } from "./numerical-methods/linear-systems/gauss-seidel"
import { jacobi } from "./numerical-methods/linear-systems/jacobi"

// Main function to solve numerical methods
export function solveNumericalMethod(
    method: string,
    params: BisectionParams | NewtonRaphsonParams | SecantMethodParams | GaussEliminationParams | GaussJordanParams | GaussSeidelParams | JacobiParams | Record<string, unknown>

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
        case 'gauss-elimination':
            return gaussElimination(params as GaussEliminationParams)
        case 'gauss-jordan':
            return gaussJordan(params as GaussJordanParams)
        case 'gauss-seidel':
            return gaussSeidel(params as GaussSeidelParams)
        case 'jacobi':
            return jacobi(params as JacobiParams)
        default:
            throw new Error(`Method ${method} not implemented`)
    }
}
