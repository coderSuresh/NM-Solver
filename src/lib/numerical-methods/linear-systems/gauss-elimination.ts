import { createStep, customFormatNumber } from "../utils";

export function gaussElimination(params: GaussEliminationParams): GaussEliminationResult {
    const { matrix: A, constants: b } = params;

    // Validate inputs
    if (A.length !== b.length || A.some(row => row.length !== A.length)) {
        throw new Error("Invalid matrix inputs.");
    }

    // Create augmented matrix by combining A and b
    const augmented = A.map((row, i) => [...row, b[i]]);
    const steps: ReturnType<typeof createStep>[] = [];
    const n = A.length;

    // Record initial step
    const recordStep = (description: string, stepNumber: number) => {
        const matrixString = augmented
            .map(row => row.map(val => customFormatNumber(val)).join(' & '))
            .join(' \\\\\\\\ ');

        steps.push(createStep(
            stepNumber,
            description,
            "\\text{Augmented Matrix:}",
            `\\begin{bmatrix} ${matrixString} \\end{bmatrix}`,
            ""
        ));
    };

    let stepNumber = 0;
    recordStep("Initial augmented matrix", ++stepNumber);

    // Forward elimination
    for (let pivot = 0; pivot < n; pivot++) {
        // Find row with the largest pivot value (partial pivoting)
        let maxRow = pivot;
        for (let row = pivot + 1; row < n; row++) {
            if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[maxRow][pivot])) {
                maxRow = row;
            }
        }

        // Swap current pivot row with the largest pivot value
        if (maxRow !== pivot) {
            [augmented[pivot], augmented[maxRow]] = [augmented[maxRow], augmented[pivot]];
            recordStep(`Swapped row ${pivot + 1} with row ${maxRow + 1}`, ++stepNumber);
        }

        // Ensure pivot element is not 0 or close to 0
        const tolerance = 1e-10;
        if (Math.abs(augmented[pivot][pivot]) < tolerance) {
            throw new Error("Matrix is singular. No unique solution exists.");
        }

        // Eliminate entries below the pivot
        for (let row = pivot + 1; row < n; row++) {
            const factor = augmented[row][pivot] / augmented[pivot][pivot];
            for (let col = pivot; col <= n; col++) {
                augmented[row][col] -= factor * augmented[pivot][col];
            }
            recordStep(
                `Eliminated x${pivot + 1} from equation ${row + 1} using factor ${customFormatNumber(factor)}`,
                ++stepNumber
            );
        }
    }

    // Back substitution
    const solution = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = augmented[i][n];
        for (let j = i + 1; j < n; j++) {
            solution[i] -= augmented[i][j] * solution[j];
        }
        solution[i] /= augmented[i][i];
    }

    // Create final step with solution
    const solutionString = solution
        .map((val, i) => `x_{${i + 1}} = ${customFormatNumber(val)}`)
        .join(', \\\\ ');

    steps.push(createStep(
        ++stepNumber,
        "Final Solution (after back substitution)",
        "\\text{Solution:}",
        `\\begin{aligned} ${solutionString} \\end{aligned}`,
        ""
    ));

    // Create iteration table
    const table: (string | number)[][] = [
        ["Variable", "Value"]
    ];

    solution.forEach((val, i) => {
        table.push([`x${i + 1}`, customFormatNumber(val)]);
    });

    return {
        title: "Gauss Elimination Method Solution",
        steps,
        iterationTable: table,
        finalAnswer: `Solution: ${solution.map((val, i) => `x${i + 1} = ${customFormatNumber(val)}`).join(', ')}`,
        solution
    };
}
