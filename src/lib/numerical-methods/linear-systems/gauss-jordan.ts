import { createStep, customFormatNumber } from "../utils";

export function gaussJordan(params: GaussJordanParams): GaussJordanResult {
    const { matrix: A, constants: b } = params;

    // Validate inputs
    if (A.length !== b.length || A.some(row => row.length !== A.length)) {
        throw new Error("Invalid matrix inputs.");
    }

    // Create augmented matrix by combining A and b
    const augmented = A.map((row, i) => [...row, b[i]]);
    const steps: ReturnType<typeof createStep>[] = [];
    const n = A.length;

    // Record step
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

    // Gauss-Jordan elimination
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

        // Normalize the pivot row
        const pivotElement = augmented[pivot][pivot];
        for (let col = pivot; col < n + 1; col++) {
            augmented[pivot][col] /= pivotElement;
        }
        recordStep(`Normalized row ${pivot + 1}`, ++stepNumber);

        // Eliminate entries above and below the pivot
        for (let row = 0; row < n; row++) {
            if (row !== pivot) {
                const factor = augmented[row][pivot];
                for (let col = pivot; col < n + 1; col++) {
                    augmented[row][col] -= factor * augmented[pivot][col];
                }
                recordStep(
                    `Eliminated x${pivot + 1} from equation ${row + 1}`,
                    ++stepNumber
                );
            }
        }
    }

    // Extract solution (last column of augmented matrix)
    const solution = augmented.map(row => row[n]);

    // Create final step with solution
    const solutionString = solution
        .map((val, i) => `x_{${i + 1}} = ${customFormatNumber(val)}`)
        .join(', \\\\ ');

    steps.push(createStep(
        ++stepNumber,
        "Final Solution (reduced row echelon form)",
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
        title: "Gauss-Jordan Method Solution",
        steps,
        iterationTable: table,
        finalAnswer: `Solution: ${solution.map((val, i) => `x${i + 1} = ${customFormatNumber(val)}`).join(', ')}`,
        solution
    };
}
