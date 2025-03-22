function gaussElimination(A, b) {
    //validating inputs
    if (A.length !== b.length || A.some(row => row.length !== A.length)) {
        throw new Error("Invalid  matrix inputs.");
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

    recordStep("Initial augmented matrix:");

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

        //eliminate entries below the pivot
        for (let row = pivot + 1; row < n; row++) {
            const factor = augmented[row][pivot] / augmented[pivot][pivot];
            for (let col = pivot; col <= n; col++) {
                augmented[row][col] -= factor * augmented[pivot][col];
            }
            recordStep(`Eliminated x${pivot + 1} from equation ${row + 1} using factor ${factor.toFixed(3)}`);
        }
    }

    //Back Substitution: solves for variables starting from last row and moving upwards
    const solution = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = augmented[i][n];
        for (let j = i + 1; j < n; j++) {
            solution[i] -= augmented[i][j] * solution[j];
        }
        solution[i] /= augmented[i][i];
    }

    return { solution, steps };
}



