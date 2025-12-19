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
                id: "gauss-elimination",
                title: "Gauss Elimination",
                description: "Direct method for solving linear systems using forward elimination and back substitution.",
            },
            {
                id: "gauss-jordan",
                title: "Gauss-Jordan Elimination",
                description: "Direct method that transforms the system into reduced row echelon form to find the solution.",
            },
            {
                id: "jacobi",
                title: "Jacobi Method",
                description: "Iterative method for solving linear systems using simultaneous updates of all variables.",
            },
            {
                id: "gauss-seidel",
                title: "Gauss-Seidel Method",
                description: "Iterative method that uses updated values immediately, often converging faster than Jacobi.",
            },
        ],
    },
    {
        id: "integration",
        label: "Integration",
        methods: [
            {
                id: "trapezoidal",
                title: "Trapezoidal Rule (Coming Soon)",
                description: "Numerical integration method that approximates the region under a curve using trapezoids.",
            },
            {
                id: "simpsons",
                title: "Simpson's Rule (Coming Soon)",
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
                title: "Euler's Method (Coming Soon)",
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
            <TabsList className="flex h-fit w-full p-2 items-start justify-between flex-col sm:flex-row space-x-4 gap-y-4">
                {methodCategories.map((category) => (
                    <TabsTrigger className="m-0 w-full px-2 py-1" key={category.id} value={category.id}>
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

