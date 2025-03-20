function secant_method(equation, x0, x1, decimalPlaces = 2) {

    //creating function f from input equation
    let f;
    try {
        f = new Function('x', `return ${equation};`);
    } catch (error) {
        throw new Error('Invalid equation format.');
    }

     if (x0 === x1) {
        throw new Error('x0 and x1 cannot be same.');
    }

    //setting a tolerable error (correct upto X decimal places)
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);

     //preventing infinite loop by adding a limit
    const maxIterations = 100;

    //initializing the variables
    let previousX = x0;
    let currentX = x1;
    let f_prev = f(previousX);
    let f_current = f(currentX);
    const steps = [];
    let count = 0;

    //looping until we get solution correct upto required decimal places
    do {
        count++;
        if (count > maxIterations) {
            throw new Error('Max iterations reached without solution.');
        }

        // checking for division by zero
        if (f_current - f_prev === 0) {
            throw new Error('f(x1) - f(x0) is zero.');
        }

        // Secant method formula
        const nextX = currentX - (f_current * (currentX - previousX)) / (f_current - f_prev);
        const f_next = f(nextX);

        // adding current steps into steps array
        steps.push({
            count: count,
            x0: previousX,
            x1: currentX,
            x2: nextX,
            f_x0: f_prev,
            f_x1: f_current,
            f_x2: f_next
        });

        // checking if exact root is found
        if (f_next === 0) break;

        // checking if we get solution correct upto X decimal places
        if (Math.abs(nextX - currentX) <= tolerance) break;

        // updating variable for next iteration
        previousX = currentX;
        currentX = nextX;
        f_prev = f_current;
        f_current = f_next;

    } while (true);

    return steps;
}