"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scale } from "lucide-react"

export function HeroSection() {
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/run-app-py", { method: "POST" });
      const data = await res.json();
      if (data.success && data.streamlitUrl) {
        window.open(data.streamlitUrl, '_blank');
      } else {
        alert(data.error || "Service unavailable");
      }
    } catch (e) {
      alert("Service temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Scale className="h-4 w-4" />
              Legalizer - AI Legal Clarity
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Making Legal Documents <span className="text-primary">Simple</span> and Easy to Understand
          </h1>

          <p className="mb-8 text-lg text-muted-foreground text-pretty sm:text-xl lg:text-2xl">
            AI-powered tool that turns complex legal language into clear, simple explanations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="text-lg px-12 py-8" 
              onClick={handleGetStarted}
              disabled={loading}
            >
              {loading ? "Opening..." : "Get Started"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            Trusted by thousands of individuals
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}
