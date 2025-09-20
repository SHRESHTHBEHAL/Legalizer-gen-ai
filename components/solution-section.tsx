import { Brain, Zap, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SolutionSection() {
  const solutions = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "AI reads your documents and explains them in simple language.",
    },
    {
      icon: Zap,
      title: "Quick Summaries",
      description: "Get document summaries in seconds with key points highlighted.",
    },
    {
      icon: Shield,
      title: "Find Issues",
      description: "Spot potential problems and important details automatically.",
    },
    {
      icon: Users,
      title: "Ask Questions",
      description: "Ask anything about your documents and get clear answers.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Our <span className="text-primary">Solution</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            AI that makes legal documents easy to understand.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-background"
            >
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
