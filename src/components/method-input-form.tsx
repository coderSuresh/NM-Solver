"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const methodInputConfigs: Record<string, InputFieldConfig[]> = {
    "newton-raphson": [
        {
            id: "function",
            label: "Function f(x)",
            type: "text",
            placeholder: "e.g., x^2 - 4",
        },
        {
            id: "initialGuess",
            label: "Initial Guess (x₀)",
            type: "number",
            placeholder: "e.g., 2",
        },
        {
            id: "tolerance",
            label: "Tolerance",
            type: "number",
            placeholder: "e.g., 3",
            defaultValue: 2,
        },
        {
            id: "maxIterations",
            label: "Maximum Iterations",
            type: "number",
            placeholder: "e.g., 10",
            defaultValue: 10,
        },
    ],
    bisection: [
        {
            id: "function",
            label: "Function f(x)",
            type: "text",
            placeholder: "e.g., x^2 - 4",
        },
        {
            id: "lowerBound",
            label: "Lower Bound (a)",
            type: "number",
            placeholder: "e.g., 0",
        },
        {
            id: "upperBound",
            label: "Upper Bound (b)",
            type: "number",
            placeholder: "e.g., 3",
        },
        {
            id: "tolerance",
            label: "Tolerance",
            type: "number",
            placeholder: "e  3",
        },
        {
            id: "maxIterations",
            label: "Maximum Iterations",
            type: "number",
            placeholder: "e.g., 20",
            defaultValue: 20,
        },
    ],
    "false-position": [
        {
            id: "function",
            label: "Function f(x)",
            type: "text",
            placeholder: "e.g., x^2 - 4",
        },
        {
            id: "lowerBound",
            label: "Lower Bound (a)",
            type: "number",
            placeholder: "e.g., 0",
        },
        {
            id: "upperBound",
            label: "Upper Bound (b)",
            type: "number",
            placeholder: "e.g., 3",
        },
        {
            id: "tolerance",
            label: "Tolerance",
            type: "number",
            placeholder: "e.g., 3",
            defaultValue: 3,
        },
        {
            id: "maxIterations",
            label: "Maximum Iterations",
            type: "number",
            placeholder: "e.g., 20",
            defaultValue: 20,
        },
    ],
    secant: [
        {
            id: "function",
            label: "Function f(x)",
            type: "text",
            placeholder: "e.g., x^2 - 4",
        },
        {
            id: "x0",
            label: "Initial x₀",
            type: "number",
            placeholder: "e.g., 0",
        },
        {
            id: "x1",
            label: "Initial x₁",
            type: "number",
            placeholder: "e.g., 3",
        },
        {
            id: "tolerance",
            label: "Tolerance",
            type: "number",
            placeholder: "e.g., 3",
            defaultValue: 2,
        },
        {
            id: "maxIterations",
            label: "Maximum Iterations",
            type: "number",
            placeholder: "e.g., 20",
            defaultValue: 20,
        },
    ],
}

interface MethodInputFormProps {
    method: string
    onSolve: (formData: Record<string, unknown>) => void
    loading: boolean
}

export function MethodInputForm({ method, onSolve, loading }: MethodInputFormProps) {
    const [formData, setFormData] = useState<Record<string, unknown>>({})
    const [validationError, setValidationError] = useState<string | null>(null)

    // Initialize form with default values
    useState(() => {
        const config = methodInputConfigs[method as keyof typeof methodInputConfigs] || []
        const defaults: Record<string, unknown> = {}

        config.forEach((field) => {
            if (field.defaultValue !== undefined) {
                defaults[field.id] = field.defaultValue
            }
        })

        setFormData(defaults)
    })

    const handleChange = (key: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
        setValidationError(null) // Clear validation error when user changes input
    }

    const validateForm = () => {
        // Method-specific validation
        if (method === "bisection") {
            const { function: func, lowerBound, upperBound } = formData

            if (!func || lowerBound === undefined || upperBound === undefined) {
                return "Please fill in all required fields"
            }

            // Check if lower bound is less than upper bound
            if (lowerBound === null || upperBound === null || lowerBound >= upperBound) {
                return "Lower bound must be less than upper bound"
            }
        }

        return null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form
        const error = validateForm()
        if (error) {
            setValidationError(error)
            return
        }

        onSolve(formData)
    }

    // Get the input fields for the selected method
    const inputFields = methodInputConfigs[method as keyof typeof methodInputConfigs] || []

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {validationError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{validationError}</AlertDescription>
                </Alert>
            )}

            {inputFields.map((field) => (
                <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>

                    {field.type === "textarea" ? (
                        <Textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] as string | number || ""}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            required
                            className={field.className}
                        />
                    ) : field.type === "slider" ? (
                        <div className="flex items-center space-x-4">
                            <Slider
                                id={field.id}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                value={[formData[field.id] || field.defaultValue]}
                                onValueChange={(value) => handleChange(field.id, value[0])}
                                className="flex-1"
                            />
                            <span className="w-12 text-center">{formData[field.id] || field.defaultValue}</span>
                        </div>
                    ) : (
                        <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id] as string | number | readonly string[] | undefined || ""}
                            onChange={(e) => {
                                const value = field.type === "number" ? Number.parseFloat(e.target.value) : e.target.value
                                handleChange(field.id, value)
                            }}
                            required
                            className={field.className}
                        />
                    )}

                    {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
                </div>
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Solving..." : "Solve Problem"}
            </Button>
        </form>
    )
}

