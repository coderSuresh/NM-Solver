import { evaluateExpression, createStep, customFormatNumber } from "../utils";

export function bisection(params: BisectionParams): BisectionResult {
    const {
        function: func,
        lowerBound,
        upperBound,
        tolerance: decimalPlaces = 2,
        maxIterations = 100
    } = params;

    let a = lowerBound!;
    let b = upperBound!;
    let iteration = 0;
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);

    const steps: BisectionStep[] = [];
    const table: (string | number)[][] = [["Iteration", "a", "b", "c", "f(a)", "f(b)", "f(c)", "Error"]];

    let fa = evaluateExpression(func, { x: a });
    let fb = evaluateExpression(func, { x: b });

    if (fa * fb >= 0) {
        return {
            title: "Bisection Method Solution",
            steps: [createStep(
                1,
                "No root guaranteed in the given interval",
                "$f(a) \\cdot f(b) < 0$",
                `$f(${a}) = ${fa.toFixed(6)}, f(${b}) = ${fb.toFixed(6)}`,
                "Interval is invalid for the bisection method."
            )],
            iterationTable: [],
            finalAnswer: `No root guaranteed in the interval [${a}, ${b}]`
        };
    }

    let foundExactRoot = false;
    let c = 0;

    while ((b - a) > 2 * tolerance && iteration < maxIterations) {
        iteration++;
        c = (a + b) / 2;
        const fc = evaluateExpression(func, { x: c });

        // Add the current step to the steps array for display
        steps.push(createStep(
            iteration,
            `Iteration ${iteration}`,
            "$$c = \\frac{a + b}{2}$$",
            `$$c = \\frac{${customFormatNumber(a)} + ${customFormatNumber(b)}}{2} = ${customFormatNumber(c)}$$`,
            `$$f(a) = ${customFormatNumber(fa)}$$\n$$f(b) = ${customFormatNumber(fb)}$$\n$$f(c) = ${customFormatNumber(fc)}$$`
        ));

        table.push([
            iteration,
            customFormatNumber(a),
            customFormatNumber(b),
            customFormatNumber(c),
            customFormatNumber(fa),
            customFormatNumber(fb),
            customFormatNumber(fc),
            customFormatNumber(b - a)
        ]);

        if (fc === 0) {
            foundExactRoot = true;
            break;
        }

        if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }

    if (!foundExactRoot) {
        iteration++;
        c = (a + b) / 2;
        const faFinal = evaluateExpression(func, { x: a });
        const fbFinal = evaluateExpression(func, { x: b });
        const fcFinal = evaluateExpression(func, { x: c });

        // Add the final step if root was not found within tolerance
        steps.push(createStep(
            iteration,
            `Final Iteration ${iteration}`,
            "$$c = \\frac{a + b}{2}$$",
            `$$c = \\frac{${customFormatNumber(a)} + ${customFormatNumber(b)}}{2} = ${customFormatNumber(c)}$$`,
            `$$f(a) = ${customFormatNumber(faFinal)}$$\n$$f(b) = ${customFormatNumber(fbFinal)}$$\n$$f(c) = ${customFormatNumber(fcFinal)}$$`
        ));

        const previousC = table[table.length - 1][3]; // Get the previous c value from the table
        const error = Math.abs(c - parseFloat(previousC.toString()));

        table.push([
            iteration,
            customFormatNumber(a),
            customFormatNumber(b),
            customFormatNumber(c),
            customFormatNumber(faFinal),
            customFormatNumber(fbFinal),
            customFormatNumber(fcFinal),
            customFormatNumber(error)
        ]);
    }

    return {
        title: "Bisection Method Solution",
        steps,
        iterationTable: table,
        finalAnswer: `x = ${c.toString().slice(0, decimalPlaces + 2)} (after ${iteration} iterations)`
    };
}
