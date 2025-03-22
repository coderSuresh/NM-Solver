import { evaluateExpression, createStep, customFormatNumber } from "../utils";

export function secantMethod(params: SecantMethodParams): SecantMethodResult {
    const {
        function: func,
        x0,
        x1,
        decimalPlaces = 2,
        maxIterations = 100
    } = params;

    // Setting a tolerable error (correct up to X decimal places)
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);

    // Initialize variables
    let previousX = x0;
    let currentX = x1;
    let f_prev = evaluateExpression(func, { x: previousX });
    let f_current = evaluateExpression(func, { x: currentX });

    // Prevent division by zero
    if (f_current - f_prev === 0) {
        throw new Error('f(x1) - f(x0) is zero.');
    }

    const steps: SecantMethodStep[] = [];
    let count = 0;

    // Looping until we get a solution correct up to required decimal places
    while (true) {
        count++;

        if (count > maxIterations) {
            throw new Error('Max iterations reached without solution.');
        }

        // Secant method formula
        const nextX = currentX - (f_current * (currentX - previousX)) / (f_current - f_prev);
        const f_next = evaluateExpression(func, { x: nextX });

        // Save current step
        steps.push({
            count: count,
            x0: previousX,
            x1: currentX,
            x2: nextX,
            f_x0: f_prev,
            f_x1: f_current,
            f_x2: f_next
        });

        // Check if exact root is found
        if (f_next === 0) {
            break;
        }

        // Check if solution is correct up to X decimal places
        if (Math.abs(nextX - currentX) <= tolerance) {
            break;
        }

        // Update variables for next iteration
        previousX = currentX;
        currentX = nextX;
        f_prev = f_current;
        f_current = f_next;
    }

    const lastStep = steps[steps.length - 1];

    // Build the iteration table with a header row using MathJax syntax.
    const iterationTable = [
        [
            "$Iteration$",
            "$x_0$",
            "$x_1$",
            "$x_2$",
            "$f(x_0)$",
            "$f(x_1)$",
            "$f(x_2)$"
        ],
        ...steps.map(step => [
            step.count.toString(),
            customFormatNumber(step.x0),
            customFormatNumber(step.x1),
            customFormatNumber(step.x2),
            customFormatNumber(step.f_x0),
            customFormatNumber(step.f_x1),
            customFormatNumber(step.f_x2)
        ])
    ];

    // Format the steps into a string for display with MathJax inline expressions.
    const formattedSteps = steps.map(step =>
        createStep(
            step.count,
            `Iteration ${step.count}`,
            "$x_2 = x_1 - \\frac{f(x_1) (x_1 - x_0)}{f(x_1) - f(x_0)}$",
            `$x_2 = ${customFormatNumber(step.x1)} - \\frac{${customFormatNumber(step.f_x1)} ( ${customFormatNumber(step.x1)} - ${customFormatNumber(step.x0)} )}{${customFormatNumber(step.f_x1)} - ${customFormatNumber(step.f_x0)}} = ${customFormatNumber(step.x2)}$`,
            `$f(x_2) = ${customFormatNumber(step.f_x2)}$`
        )
    );

    return {
        title: "Secant Method Solution",
        steps: formattedSteps,
        iterationTable: iterationTable,
        finalAnswer: `x = ${customFormatNumber(lastStep.x2)} (after ${steps.length} iterations)`
    };
}
