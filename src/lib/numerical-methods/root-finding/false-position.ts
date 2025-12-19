import { evaluateExpression, createStep } from "../utils";

// A helper function to always format numbers in fixed-point notation.
function customFormatNumber(num: number, precision = 6): string {
    return num.toFixed(precision);
}

export function falsePosition(params: BisectionParams) {
    const {
        function: func,
        lowerBound: a0,
        upperBound: b0,
        tolerance: decimalPlaces = 2,
        maxIterations = 100
    } = params;

    // Convergence tolerance
    const tol = 0.5 * Math.pow(10, -decimalPlaces);

    // Initialize endpoints
    let a = Number(a0);
    let b = Number(b0);
    let fa = evaluateExpression(func, { x: a });
    let fb = evaluateExpression(func, { x: b });

    // Check that the initial interval brackets a root.
    if (fa * fb >= 0) {
        throw new Error('Root does not exist within the interval.');
    }

    const steps: FalsePositionStep[] = [];
    let iter = 0;
    let c = a;                      // Current estimate of the root.
    let prevC: number | null = null; // Previous estimate for error computation.
    let error = Number.MAX_VALUE;

    // Main loop: iterate until error between successive c values is below tol.
    while (error > tol && iter < maxIterations) {
        iter++;

        // Recompute function values at the endpoints.
        fa = evaluateExpression(func, { x: a });
        fb = evaluateExpression(func, { x: b });

        // Compute new estimate using the false position formula.
        c = (a * fb - b * fa) / (fb - fa);
        const fc = evaluateExpression(func, { x: c });

        // Compute error: for the first iteration use the interval width.
        error = prevC === null ? Math.abs(b - a) : Math.abs(c - prevC);

        // Save the iteration details.
        steps.push({
            stepNumber: iter,
            a: a,
            b: b,
            c: c,
            f_a: fa,
            f_b: fb,
            f_c: fc,
            error: error
        });

        // If the function value is close enough, we can stop.
        if (Math.abs(fc) < tol) {
            break;
        }

        // Update the interval based on the sign of f(c)
        if (fa * fc < 0) {
            b = c;
        } else {
            a = c;
        }

        // Store current c to compute error in the next iteration.
        prevC = c;
    }

    if (iter >= maxIterations) {
        throw new Error("Max iterations reached without solution.");
    }

    const lastStep = steps[steps.length - 1];

    // Build the iteration table with a header row using MathJax syntax.
    const iterationTable = [
        [
            "$Iteration$",
            "$a$",
            "$b$",
            "$c$",
            "$f(a)$",
            "$f(b)$",
            "$f(c)$",
            "$Error$"
        ],
        ...steps.map(step => [
            step.stepNumber.toString(),
            customFormatNumber(step.a),
            customFormatNumber(step.b),
            customFormatNumber(step.c),
            customFormatNumber(step.f_a),
            customFormatNumber(step.f_b),
            customFormatNumber(step.f_c),
            customFormatNumber(step.error)
        ])
    ];

    // Use createStep to build formatted step strings with MathJax inline expressions.
    const formattedSteps = steps.map(step =>
        createStep(
            step.stepNumber,
            `Iteration ${step.stepNumber}`,
            "$\\frac{a\\,f(b)-b\\,f(a)}{f(b)-f(a)}$",
            `$c = \\frac{${step.a}\\,\\cdot\\,${customFormatNumber(step.f_b)} - ${step.b}\\,\\cdot\\,${customFormatNumber(step.f_a)}}{${customFormatNumber(step.f_b)} - ${customFormatNumber(step.f_a)}} = ${customFormatNumber(step.c)}$`,
            `$f(c) = ${customFormatNumber(step.f_c)}, \\quad Error = ${customFormatNumber(step.error)}$`
        )
    );

    return {
        title: "False Position Method Solution",
        steps: formattedSteps,
        iterationTable: iterationTable,
        finalAnswer: `x = ${customFormatNumber(lastStep.c)} (after ${iter} iterations)`
    };
}
