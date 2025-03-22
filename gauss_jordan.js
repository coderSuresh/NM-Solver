function gaussJordan(A, b) {
    //validating inputs
    if (A.length !== b.length || A.some(row => row.length !== A.length)) {
        throw new Error("Invalid matrix inputs.");
    }

    //creating augmented matrix by combining A and b
    const augmented = A.map((row, i) => [...row, b[i]]);
    const steps = [];
    const n = A.length;

    //recording initial step
    const recordStep = (description) => {
        steps.push({
            matrix: augmented.map(row => [...row]),
            description: description,
        });
    };

    recordStep("Initial augmented matrix");

    //looping over pivot rows
    for (let pivot = 0; pivot < n; pivot++) {

        //finding row with the largest pivot value
        let maxRow = pivot;
        for (let row = pivot + 1; row < n; row++) {
            if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[maxRow][pivot])) {
                maxRow = row;
            }
        }

        //swapping current pivot row with the largest pivot value
        if (maxRow !== pivot) {
            [augmented[pivot], augmented[maxRow]] = [augmented[maxRow], augmented[pivot]];
            recordStep(`Swapped row ${pivot + 1} with row ${maxRow + 1}`);
        }

        //ensuring pivot element is not 0 or close to 0
        const tolerance = 1e-10;
        if (Math.abs(augmented[pivot][pivot]) < tolerance) {
            throw new Error("Matrix is singular. No unique solution exists.");
        }

        //normalizing the pivot row
        const pivotElement = augmented[pivot][pivot];
        for (let col = pivot; col < n + 1; col++) {
            augmented[pivot][col] /= pivotElement;
        }
        recordStep(`Normalized row ${pivot + 1}`);

        //eliminating entries above and below the pivot
        for (let row = 0; row < n; row++) {
            if (row !== pivot) {
                const factor = augmented[row][pivot];
                for (let col = pivot; col < n + 1; col++) {
                    augmented[row][col] -= factor * augmented[pivot][col];
                }
                recordStep(`Eliminated x${pivot + 1} from equation ${row + 1}`);
            }
        }
    }

    //extracting solution
    const solution = augmented.map(row => row[n]);

    return { solution, steps };
}
