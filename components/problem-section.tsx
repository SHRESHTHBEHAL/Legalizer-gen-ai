import { AlertTriangle, FileText, HelpCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ProblemSection() {
  const problems = [
    {
      icon: FileText,
      title: "Complex Language",
      description: "Legal documents use confusing terms that are hard to understand.",
    },
    {
      icon: AlertTriangle,
      title: "Hidden Details",
      description: "Important information is buried in long, dense text.",
    },
    {
      icon: Clock,
      title: "Takes Too Long",
      description: "Spending hours trying to understand simple agreements.",
    },
    {
      icon: HelpCircle,
      title: "Expensive Help",
      description: "Getting legal advice for basic documents costs too much.",
    },
  ]

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Legal Documents Are <span className="text-primary">Confusing</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            People sign contracts without understanding what they mean. This creates problems.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-destructive/10 p-3">
                    <problem.icon className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
