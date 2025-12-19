const math = require('mathjs');

function newton_raphson(equation, x0, decimalPlaces = 2) {
    let expr;
    try {
        //parsing the equation into JS format
        expr = math.parse(equation);
    } catch (error) {
        throw new Error('Invalid equation format.');
    }

    //computing symbolic derivative and compile into functions
    const derivative = math.derivative(expr, 'x');
    const f = expr.compile();
    const fPrime = derivative.compile();

    //setting up tolerance and max limit to avoid infinite loop
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);
    const maxIterations = 100;

    let currentX = x0;
    const steps = [];
    let count = 0;

    //looping until we get solution correct upto required decimal places
    do {
        count++;
        if (count > maxIterations) {
            throw new Error(`Max iterations reached without solution.`);
        }

        //evaluating f(x) and f'(x) as fx and fpx
        const fx = f.evaluate({ x: currentX });
        const fpx = fPrime.evaluate({ x: currentX });

        if (fpx === 0) {
            throw new Error('Derivative is 0.');
        }

        //computing next iteration
        const nextX = currentX - fx / fpx;
        const fNext = f.evaluate({ x: nextX });

        //adding current steps into steps array
        steps.push({
            count: count,
            x_n: currentX,
            f_x_n: fx,
            f_prime_x_n: fpx,
            x_next: nextX,
            f_x_next: fNext
        });

        //breaking loop when we get solution correct upto X decimal places
        if (Math.abs(nextX - currentX) <= tolerance) {
            break;
        }
        //updating the current approximation
        currentX = nextX;
    } while (true);

    return steps;
}