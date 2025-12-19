function bisection_method(equation, a, b, decimalPlaces = 2) {

    //creating function f from input equation
    let f;
    try {
        f = new Function('x', `return ${equation};`);
    } catch (error) {
        throw new Error('Invalid equation format.');
    }

    //setting a tolerable error (correct upto X decimal places)
    const tolerance = 0.5 * Math.pow(10, -decimalPlaces);
    const faInitial = f(a);
    const fbInitial = f(b);

    //checking whether a and b have opposite signs
    if (faInitial * fbInitial >= 0) {
        throw new Error('Root does not exist within the interval.');
    }

    let currentA = a;
    let currentB = b;
    const steps = [];
    let count = 0;
    let foundExactRoot = false;
    const maxIterations = 100;

    //looping until we get solution correct upto required decimal places
    while (currentB - currentA > 2 * tolerance && count < maxIterations) {
        count++;
        const c = (currentA + currentB) / 2;
        const fa = f(currentA);
        const fb = f(currentB);
        const fc = f(c);

        //adding current step into steps array
        steps.push({
            count: count,
            a: currentA,
            b: currentB,
            c: c,
            f_a: fa,
            f_b: fb,
            f_c: fc
        });

        //checking if exact root is found
        if (fc === 0) {
            foundExactRoot = true;
            break;
        }

        //updating intervals i.e. value of a and b depending upon who gave the negative value
        if (fa * fc < 0) {
            currentB = c;
        } else {
            currentA = c;
        }
    }

    if (count >= maxIterations) {
    throw new Error("Max iterations reached without solution.");
    }

    //one last loop so we get the solution (c) pushed into steps array
    if (!foundExactRoot) {
        count++;
        const finalC = (currentA + currentB) / 2;
        const fa = f(currentA);
        const fb = f(currentB);
        const fc = f(finalC);

        steps.push({
            count: count,
            a: currentA,
            b: currentB,
            c: finalC,
            f_a: fa,
            f_b: fb,
            f_c: fc
        });
    }

    return steps;
}
