function gauss_seidel(A, b, decimalPlaces = 3, maxIterations = 100) {
    //checking the validity of inputs
    if (A.length !== 3 || A[0].length !== 3 || b.length !== 3) {
        throw new Error("Invalid input. Required 3x3 coefficient matrix and 3x1 constant matrix.");
    }

    //checking if diagonal elements are 0
    if (A[0][0] === 0 || A[1][1] === 0 || A[2][2] === 0) {
        throw new Error("Diagonal elements can not be 0.");
    }

    //checking if system is diagonally dominant
    const isDiagonallyDominant = A.every((row, i) => {
        const diagonal = Math.abs(row[i]);
        const sumOffDiagonal = row.reduce((acc, val, j) => (j !== i ? acc + Math.abs(val) : acc), 0);
        return diagonal > sumOffDiagonal;
    });
    if (!isDiagonallyDominant) {
        console.warn("System is not diagonally dominant.");
    }

    //initializing x0, y0 and z0 as 0
    let x = 0;
    let y = 0;
    let z = 0;

    const steps = [];
    let iteration = 0;

    //setting up tolerance and error
    let tolerance = 0.5 * Math.pow(10, -decimalPlaces);
    let error = Infinity;

    do {
        iteration++;

        //storing previous value to calculate error
        const xOld = x;
        const yOld = y;
        const zOld = z;


        //computing next approximation
        x = (b[0] - A[0][1] * y - A[0][2] * z) / A[0][0];
        y = (b[1] - A[1][0] * x - A[1][2] * z) / A[1][1];
        z = (b[2] - A[2][0] * x - A[2][1] * y) / A[2][2];

        //calculating error
        const error = Math.max(
            Math.abs(x - xOld),
            Math.abs(y - yOld),
            Math.abs(z - zOld)
        );

        //adding current iteration into steps array
        steps.push({
            iteration,
            x: x,
            y: y,
            z: z,
            error: error,
        });

        //breaking out of loop once we get correct upto X decimal places
        if (error <= tolerance){
            break;
        }

    } while (error > tolerance && iteration < maxIterations);

    return steps;
}

const A = [
    [4, 1, 1],
    [1, 5, 1],
    [1, 1, 6]
];
const b = [8, 10, 12];

const steps = gauss_seidel(A, b, 2)
console.log(steps);