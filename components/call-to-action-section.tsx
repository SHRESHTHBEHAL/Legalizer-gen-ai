
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function CallToActionSection() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string|null>(null);

  async function handleGetStarted() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/run-app-py", { method: "POST" });
      const data = await res.json();
      if (data.success && data.streamlitUrl) {
        setResult("Opening AI Legal Doc Analyzer...");
        window.location.href = data.streamlitUrl;
      } else {
        setResult(data.error || "Error starting the application");
      }
    } catch (e) {
      setResult("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Start Simplifying Your Legal Documents Today
          </h2>

          <p className="text-lg opacity-90 text-pretty mb-8 sm:text-xl">
            Join thousands of individuals who have taken control of their legal documents with AI-powered
            clarity and confidence.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-8 bg-white text-primary hover:bg-white/90"
              onClick={handleGetStarted}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Started"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          {result && (
            <div className="mt-4 text-sm bg-white/80 text-primary p-4 rounded shadow">
              {result}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
