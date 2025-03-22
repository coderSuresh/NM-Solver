import { MethodSelector } from "@/components/method-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Numerical Methods Solver</h1>
          <p className="text-muted-foreground text-lg">
            Solve numerical problems step by step with detailed explanations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select a Method</CardTitle>
            <CardDescription>Choose a numerical method to solve your problem</CardDescription>
          </CardHeader>
          <CardContent>
            <MethodSelector />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

