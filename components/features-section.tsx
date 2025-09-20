import { FileSearch, MessageSquare, Shield, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: FileSearch,
      title: "Document Analysis",
      description: "Break down complex legal documents into simple, understandable sections.",
    },
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Get instant answers about your documents from our AI assistant.",
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "Your documents are processed securely and never stored permanently.",
    },
    {
      icon: Clock,
      title: "Fast Results",
      description: "Get analysis in seconds, not hours. Make decisions quickly.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Simple <span className="text-primary">Legal Analysis</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Tools to help you understand legal documents better.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background"
            >
              <CardHeader className="pb-4">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
