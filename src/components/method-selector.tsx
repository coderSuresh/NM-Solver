"use client"

import { useRouter } from "next/navigation"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define method categories and their methods for better maintainability
const methodCategories = [
    {
        id: "root-finding",
        label: "Root Finding",
        methods: [
            {
                id: "newton-raphson",
                title: "Newton-Raphson Method",
                description:
                    "Iterative method for finding successively better approximations to the roots of a real-valued function.",
            },
            {
                id: "bisection",
                title: "Bisection Method",
                description:
                    "Simple and robust method that repeatedly bisects an interval and selects a subinterval where a root exists.",
            },
            {
                id: "secant",
                title: "Secant Method",
                description:
                    "A root-finding algorithm that uses a sequence of secant lines to approximate the root, improving efficiency over bisection.",
            },
            {
                id: "false-position",
                title: "False Position Method",
                description:
                    "A root-finding technique similar to the bisection method but using a weighted average for faster convergence.",
            },
        ],
    },
    {
        id: "linear-systems",
        label: "Linear Systems",
        methods: [
            {
                id: "gauss-seidel",
                title: "Gauss-Seidel Method",
                description: "Iterative technique for solving a system of linear equations by using a matrix of coefficients.",
            },
        ],
    },
    {
        id: "integration",
        label: "Integration",
        methods: [
            {
                id: "trapezoidal",
                title: "Trapezoidal Rule",
                description: "Numerical integration method that approximates the region under a curve using trapezoids.",
            },
            {
                id: "simpsons",
                title: "Simpson's Rule",
                description: "Method for numerical integration that uses quadratic polynomials to approximate the integrand.",
            },
        ],
    },
    {
        id: "differential",
        label: "Differential Eqs",
        methods: [
            {
                id: "euler",
                title: "Euler's Method",
                description:
                    "First-order numerical procedure for solving ordinary differential equations with a given initial value.",
            },
        ],
    },
]

export function MethodSelector() {
    const router = useRouter()

    const handleSelectMethod = (method: string) => {
        router.push(`/solve/${method}`)
    }

    return (
        <Tabs defaultValue="root-finding" className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${methodCategories.length}, 1fr)` }}>
                {methodCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {methodCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.methods.map((method) => (
                            <MethodCard
                                key={method.id}
                                title={method.title}
                                description={method.description}
                                onClick={() => handleSelectMethod(method.id)}
                            />
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

function MethodCard({ title, description, onClick }: MethodCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
                <Button onClick={onClick} className="w-full">
                    Select Method
                </Button>
            </CardFooter>
        </Card>
    )
}

