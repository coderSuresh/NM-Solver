"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { Step, Solution } from "@/lib/numerical-methods/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type StepByStepSolutionProps = {
    solution: Solution
}

export function StepByStepSolution({ solution }: StepByStepSolutionProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Initialize MathJax rendering with improved configuration
        if (typeof window !== "undefined") {
            if (window.MathJax) {
                // If MathJax is already loaded, configure and typeset
                window.MathJax.typesetPromise?.()
                    .then(() => {
                        console.log("MathJax typeset completed")
                    })
                    .catch((err: any) => console.error("MathJax typeset failed:", err))
            } else {
                // Load MathJax if not already loaded
                window.MathJax = {
                    tex: {
                        inlineMath: [
                            ["$", "$"],
                            ["$$", "$$"],
                        ],
                        displayMath: [
                            ["$$", "$$"],
                            ["\\[", "\\]"],
                        ],
                        processEscapes: true,
                        processEnvironments: true,
                    },
                    options: {
                        skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
                        ignoreHtmlClass: "tex2jax_ignore",
                        processHtmlClass: "tex2jax_process",
                    },
                    svg: {
                        fontCache: "global",
                    },
                }

                const script = document.createElement("script")
                script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                script.async = true
                script.id = "MathJax-script"

                document.head.appendChild(script)
            }
        }
    }, [solution])

    // Check if the solution has an iteration table
    const hasIterationTable = solution.iterationTable && solution.iterationTable.length > 0

    return (
        <div ref={containerRef} className="space-y-6" id="pdf-content">
            <h3 className="text-xl font-semibold">{solution.title}</h3>

            {/* Render iteration table if available */}
            {hasIterationTable && (
                <Card>
                    <CardContent className="p-4 overflow-auto">
                        <h4 className="font-medium mb-3">Iteration Table</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {solution.iterationTable?.[0]?.map((header, index) => (
                                        <TableHead key={index} className="text-center">
                                            {header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {solution.iterationTable?.slice(1).map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex} className="text-center">
                                                <div className="math">{cell}</div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {solution.steps.map((step) => (
                    <StepCard key={step.stepNumber} step={step} />
                ))}
            </div>

            {solution.finalAnswer && (
                <Card className="border-primary">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Final Answer:</div>
                            <div className="text-xl font-bold math">{solution.finalAnswer}</div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

// Separate component for each step card
function StepCard({ step }: { step: Step }) {
    return (
        <Card key={step.stepNumber} className="overflow-hidden">
            <CardContent className="p-0">
                <div className="bg-muted p-3 border-b">
                    <h4 className="font-medium">
                        Step {step.stepNumber}: {step.description}
                    </h4>
                </div>
                <div className="p-4 space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Formula:</div>
                        <div className="math">{step.formula}</div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-md">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Calculation:</div>
                        <div className="math">{step.calculation}</div>
                    </div>

                    {step.result && (
                        <div className="bg-primary/10 p-3 rounded-md">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Result:</div>
                            <div className="font-medium math">{step.result}</div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

