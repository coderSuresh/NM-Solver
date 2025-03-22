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
