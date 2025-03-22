import { createStep, customFormatNumber, evaluateExpression, numericalDerivative } from "../utils";

export function newtonRaphson(params: NewtonRaphsonParams): NewtonRaphsonResult {
    const {
        function: equation,
        initialGuess: x0,
        tolerance: decimalPlaces = 2,
        maxIterations = 10
    } = params;

    // Setting up tolerance and max iterations
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);

    let currentX = Number(x0);
    const steps: NewtonRaphsonStep[] = [];
    let count = 0;

    // Looping until we get the solution correct up to the required decimal places
    do {
        count++;
        if (count > maxIterations) {
            throw new Error(`Max iterations reached without solution.`);
        }

        // Using evaluateExpression to calculate f(x) at the current point
        const fx = evaluateExpression(equation, { x: currentX });

        // Using numericalDerivative to calculate f'(x) at the current point
        const fpx = numericalDerivative(equation, currentX);

        if (fpx === 0) {
            throw new Error('Derivative is 0.');
        }

        // Newton-Raphson formula to compute the next value
        const nextX = currentX - fx / fpx;
        const fNext = evaluateExpression(equation, { x: nextX });

        // Add the current step to the steps array
        steps.push({
            count: count,
            x_n: currentX,
            f_x_n: fx,
            f_prime_x_n: fpx,
            x_next: nextX,
            f_x_next: fNext
        });

        // Breaking the loop when the solution is correct up to the required tolerance
        if (Math.abs(nextX - currentX) <= tolerance) {
            break;
        }

        // Updating the current approximation
        currentX = nextX;
    } while (true);

    // Final step from the loop
    const lastStep = steps[steps.length - 1];

    // Create iteration table with MathJax syntax for rendering
    const iterationTable = [
        [
            "$Iteration$",
            "$x_n$",
            "$f(x_n)$",
            "$f'(x_n)$",
            "$x_{next}$",
            "$f(x_{next})$"
        ],
        ...steps.map(step => [
            step.count.toString(),
            customFormatNumber(step.x_n),
            customFormatNumber(step.f_x_n),
            customFormatNumber(step.f_prime_x_n),
            customFormatNumber(step.x_next),
            customFormatNumber(step.f_x_next)
        ])
    ];

    // Create formatted steps for rendering with MathJax inline
    const formattedSteps = steps.map(step =>
        createStep(
            step.count,
            `Iteration ${step.count}`,
            "$x_{next} = x_{n} - \\frac{f(x_{n})}{f'(x_{n})}$",
            `$x_{next} = ${customFormatNumber(step.x_n)} - \\frac{${customFormatNumber(step.f_x_n)}}{${customFormatNumber(step.f_prime_x_n)}} = ${customFormatNumber(step.x_next)}$`,
            `$f(x_{next}) = ${customFormatNumber(step.f_x_next)}$`
        )
    );

    // Return the formatted solution object
    return {
        title: "Newton-Raphson Method Solution",
        steps: formattedSteps,
        iterationTable: iterationTable,
        finalAnswer: `x = ${customFormatNumber(lastStep.x_next)} (after ${steps.length} iterations)`
    };
}
