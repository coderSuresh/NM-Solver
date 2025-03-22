'use client'
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { MethodInputForm } from "@/components/method-input-form"
import { StepByStepSolution } from "@/components/step-by-step-solution"
import { solveNumericalMethod } from "@/lib/solve-numerical-methods"
import { Toast } from "@/components/toast"
import type { Solution } from "@/lib/numerical-methods/utils"
import { generatePDF } from "@/lib/pdf-generator"

const methodDisplayNames: Record<string, string> = {
    "newton-raphson": "Newton-Raphson Method",
    bisection: "Bisection Method",
    "gauss-seidel": "Gauss-Seidel Method",
    "false-position": "False Position Method",
    secant: "Secant Method",
    trapezoidal: "Trapezoidal Rule",
    simpsons: "Simpson's Rule",
    euler: "Euler's Method",
}

export default function SolvePage() {
    const router = useRouter()
    const params = useParams()
    const [solution, setSolution] = useState<Solution | null>(null)
    const [loading, setLoading] = useState(false)
    const [pdfLoading, setPdfLoading] = useState(false)
    const [toast, setToast] = useState({
        title: "",
        variant: "default" as "default" | "destructive",
    })

    const method = params.method as string
    const methodTitle = methodDisplayNames[method] || method

    const handleSolve = async (formData: any) => {
        setLoading(true)
        try {
            // Simulate calculation time for better UX
            await new Promise((resolve) => setTimeout(resolve, 500))
            const result = solveNumericalMethod(method, formData)
            setSolution(result)

            // Show success toast message
            setToast({
                title: "Problem Solved",
                variant: "default",
            })

            // Save to local storage history
            saveToHistory(method, formData, result)
        } catch (error) {
            setToast({
                title: "Error solving problem",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const saveToHistory = (method: string, input: any, result: Solution) => {
        try {
            const history = JSON.parse(localStorage.getItem("numericalMethodsHistory") || "[]")
            history.unshift({
                id: Date.now(),
                method,
                methodTitle: methodDisplayNames[method],
                input,
                timestamp: new Date().toISOString(),
                result: {
                    title: result.title,
                    finalAnswer: result.finalAnswer,
                },
            })

            // Keep only the last 10 items
            const trimmedHistory = history.slice(0, 10)
            localStorage.setItem("numericalMethodsHistory", JSON.stringify(trimmedHistory))
        } catch (error) {
            console.error("Failed to save to history:", error)
        }
    }

    const handleDownloadPDF = async () => {
        if (!solution) return

        setPdfLoading(true)
        try {
            generatePDF(methodTitle, solution)

            // Show success toast message
            setToast({
                title: "PDF Generated",
                variant: "default",
            })
        } catch (error) {
            setToast({
                title: "Error generating PDF",
                variant: "destructive",
            })
        } finally {
            setPdfLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Methods
                </Button>

                <Toast
                    title={toast.title}
                    is_danger={toast.variant === "destructive"}
                    onHide={() => setToast({ title: "", variant: "default" })}
                />

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{methodTitle}</h1>
                    <p className="text-muted-foreground">Enter your problem details below to get a step-by-step solution</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Problem Input</CardTitle>
                        <CardDescription>Provide the necessary information for your numerical problem</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MethodInputForm method={method} onSolve={handleSolve} loading={loading} />
                    </CardContent>
                </Card>

                {solution && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Step-by-Step Solution</CardTitle>
                                <CardDescription>Detailed breakdown of the solution process</CardDescription>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" onClick={handleDownloadPDF} disabled={pdfLoading}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {pdfLoading ? "Generating..." : "PDF"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <StepByStepSolution solution={solution} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
