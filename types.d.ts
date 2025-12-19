type MethodCardProps = {
    title: string
    description: string
    onClick: () => void
}

interface Window {
    MathJax: any
}

// Define input field configurations for each method
type InputFieldConfig = {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    helpText?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: any;
    className?: string;
}


interface BisectionParams {
    function: string;
    lowerBound: number;
    upperBound: number;
    tolerance?: number;
    maxIterations?: number;
}

interface BisectionResult {
    title: string;
    steps: any[];
    iterationTable: any[][];
    finalAnswer: string;
}

interface BisectionStep {
    stepNumber: number;
    description: string;
    formula: string;
    calculation: string;
    result?: string | number;
};


interface FalsePositionStep {
    stepNumber: number;
    a: number;
    b: number;
    c: number;
    f_a: number;
    f_b: number;
    f_c: number;
    error: number;
}

interface NewtonRaphsonParams {
    function: string;
    initialGuess: number;
    tolerance?: number;
    maxIterations?: number;
}

interface NewtonRaphsonStep {
    count: number;
    x_n: number;
    f_x_n: number;
    f_prime_x_n: number;
    x_next: number;
    f_x_next: number;
}

interface NewtonRaphsonResult {
    title: string;
    steps: ReturnType<typeof createStep>[];
    iterationTable: string[][];
    finalAnswer: string;
}

interface SecantMethodParams {
    function: string;
    x0: number;
    x1: number;
    decimalPlaces?: number;
    maxIterations?: number;
}

interface SecantMethodStep {
    count: number;
    x0: number;
    x1: number;
    x2: number;
    f_x0: number;
    f_x1: number;
    f_x2: number;
}

interface SecantMethodResult {
    title: string;
    steps: any[];
    iterationTable: string[][];
    finalAnswer: string;
}

// Linear System Methods Types
interface GaussEliminationParams {
    matrix: number[][];
    constants: number[];
}

interface GaussEliminationResult {
    title: string;
    steps: any[];
    iterationTable: any[][];
    finalAnswer: string;
    solution: number[];
}

interface GaussJordanParams {
    matrix: number[][];
    constants: number[];
}

interface GaussJordanResult {
    title: string;
    steps: any[];
    iterationTable: any[][];
    finalAnswer: string;
    solution: number[];
}

interface GaussSeidelParams {
    matrix: number[][];
    constants: number[];
    decimalPlaces?: number;
    maxIterations?: number;
}

interface GaussSeidelIterationStep {
    iteration: number;
    x: number;
    y: number;
    z: number;
    error: number;
}

interface GaussSeidelResult {
    title: string;
    steps: any[];
    iterationTable: any[][];
    finalAnswer: string;
    solution: number[];
    iterations: number;
    iterationSteps: GaussSeidelIterationStep[];
}

interface JacobiParams {
    matrix: number[][];
    constants: number[];
    decimalPlaces?: number;
    maxIterations?: number;
}

interface JacobiIterationStep {
    iteration: number;
    x: number;
    y: number;
    z: number;
    error: number;
}

interface JacobiResult {
    title: string;
    steps: any[];
    iterationTable: any[][];
    finalAnswer: string;
    solution: number[];
    iterations: number;
    iterationSteps: JacobiIterationStep[];
}