import { createStep, customFormatNumber } from "../utils";

export function gaussSeidel(params: GaussSeidelParams): GaussSeidelResult {
    const {
        matrix: A,
        constants: b,
        decimalPlaces = 3,
        maxIterations = 100
    } = params;

    // Check the validity of inputs
    if (A.length !== 3 || A[0].length !== 3 || b.length !== 3) {
        throw new Error("Invalid input. Required 3x3 coefficient matrix and 3x1 constant matrix.");
    }

    // Check if diagonal elements are 0
    if (A[0][0] === 0 || A[1][1] === 0 || A[2][2] === 0) {
        throw new Error("Diagonal elements cannot be 0.");
    }

    // Check if system is diagonally dominant
    const isDiagonallyDominant = A.every((row, i) => {
        const diagonal = Math.abs(row[i]);
        const sumOffDiagonal = row.reduce((acc, val, j) => (j !== i ? acc + Math.abs(val) : acc), 0);
        return diagonal > sumOffDiagonal;
    });

    const steps: ReturnType<typeof createStep>[] = [];
    let stepNumber = 0;

    // Initial information
    if (!isDiagonallyDominant) {
        steps.push(createStep(
            ++stepNumber,
            "Warning",
            "\\text{Diagonal Dominance Check:}",
            "System is not diagonally dominant. Convergence is not guaranteed.",
            ""
        ));
    } else {
        steps.push(createStep(
            ++stepNumber,
            "Diagonal Dominance",
            "\\text{Diagonal Dominance Check:}",
            "System is diagonally dominant. Convergence is guaranteed.",
            ""
        ));
    }

    // Show the system of equations
    const systemEqs = A.map((row, i) =>
        `${row.map((coef, j) => `${customFormatNumber(coef)}x_{${j + 1}}`).join(' + ')} = ${customFormatNumber(b[i])}`
    ).join(' \\\\\\\\ ');

    steps.push(createStep(
        ++stepNumber,
        "System of Equations",
        "\\text{Given System:}",
        `\\begin{aligned} ${systemEqs} \\end{aligned}`,
        ""
    ));

    // Initialize x, y, z as 0
    let x = 0;
    let y = 0;
    let z = 0;

    const iterationSteps: GaussSeidelIterationStep[] = [];
    let iteration = 0;

    // Set up tolerance and error
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);
    let error = Infinity;

    // Create iteration table
    const table: (string | number)[][] = [
        ["Iteration", "x", "y", "z", "Error"]
    ];

    do {
        iteration++;

        // Store previous values to calculate error
        const xOld = x;
        const yOld = y;
        const zOld = z;

        // Compute next approximation (Gauss-Seidel uses updated values immediately)
        x = (b[0] - A[0][1] * y - A[0][2] * z) / A[0][0];
        y = (b[1] - A[1][0] * x - A[1][2] * z) / A[1][1];
        z = (b[2] - A[2][0] * x - A[2][1] * y) / A[2][2];

        // Calculate error
        error = Math.max(
            Math.abs(x - xOld),
            Math.abs(y - yOld),
            Math.abs(z - zOld)
        );

        // Add current iteration to steps array
        iterationSteps.push({
            iteration,
            x,
            y,
            z,
            error
        });

        table.push([
            iteration,
            customFormatNumber(x),
            customFormatNumber(y),
            customFormatNumber(z),
            customFormatNumber(error)
        ]);

        // Breaking out of loop once we get correct up to X decimal places
        if (error <= tolerance) {
            break;
        }

    } while (error > tolerance && iteration < maxIterations);

    // Add iteration details to steps
    steps.push(createStep(
        ++stepNumber,
        `Converged after ${iteration} iterations`,
        "\\text{Final Values:}",
        `\\begin{aligned} x &= ${customFormatNumber(x)} \\\\\\\\ y &= ${customFormatNumber(y)} \\\\\\\\ z &= ${customFormatNumber(z)} \\\\\\\\ \\text{Error} &= ${customFormatNumber(error)} \\end{aligned}`,
        ""
    ));

    return {
        title: "Gauss-Seidel Method Solution",
        steps,
        iterationTable: table,
        finalAnswer: `Solution: x = ${customFormatNumber(x)}, y = ${customFormatNumber(y)}, z = ${customFormatNumber(z)} (${iteration} iterations)`,
        solution: [x, y, z],
        iterations: iteration,
        iterationSteps
    };
}
