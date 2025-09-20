"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

export function DemoSection() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  const sampleResults = {
    summary:
      "This appears to be a standard employment agreement with a 90-day probationary period, standard benefits package, and a non-compete clause limited to 6 months post-employment.",
    keyPoints: [
      { type: "info", text: "Salary: $75,000 annually with quarterly review opportunities" },
      { type: "warning", text: "Non-compete clause restricts similar work for 6 months after leaving" },
      { type: "info", text: "Health insurance begins after 30 days of employment" },
      { type: "warning", text: "Termination requires 2 weeks notice from employee, immediate from employer" },
    ],
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Try It <span className="text-primary">Yourself</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Paste a sample legal text below and see how our AI transforms complex jargon into clear, understandable
            insights.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Input Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your legal document text here, or try our sample: 'The Employee agrees to a probationary period of ninety (90) days during which either party may terminate this agreement with or without cause...'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={handleAnalyze} disabled={!inputText.trim() || isAnalyzing} className="flex-1">
                  {isAnalyzing ? "Analyzing..." : "Analyze Document"}
                </Button>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analysis results will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground">{sampleResults.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Points</h4>
                    <div className="space-y-2">
                      {sampleResults.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          {point.type === "warning" ? (
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-muted-foreground">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
