"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlanStore } from "@/store/planStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ChefHat } from "lucide-react";

export default function KitchenPage() {
  const router = useRouter();
  const { recipe } = usePlanStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  if (!recipe) {
    return (
      <div className="container py-12 text-center">
        <p>No active recipe. Please generate one first.</p>
        <Button className="mt-4" onClick={() => router.push("/roster")}>Go to Roster</Button>
      </div>
    );
  }

  const steps = recipe.steps;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const nextStep = () => {
    if (!isLastStep) setCurrentStepIndex(i => i + 1);
  };

  const prevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(i => i - 1);
  };

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-6 flex flex-col h-[85vh] animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/board")}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <h2 className="font-bold text-lg">{recipe.title}</h2>
          <span className="text-sm font-medium text-muted-foreground">Step {currentStepIndex + 1} of {steps.length}</span>
        </div>
        <div className="w-10"></div> {/* spacer */}
      </div>

      <div className="flex-1 flex flex-col justify-center py-8">
        {currentStep.isBranch ? (
          <Card className="border-[var(--saffron)] border-2 bg-[var(--saffron)]/10 shadow-lg scale-105 transition-transform duration-300">
            <CardContent className="pt-8 pb-8 flex flex-col items-center text-center space-y-6">
              <div className="bg-[var(--saffron)] p-4 rounded-full text-white shadow-xl">
                <AlertTriangle className="h-10 w-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--saffron)] uppercase tracking-wide">
                  Attention: {currentStep.targetProfile}
                </h3>
                <p className="text-xl leading-relaxed text-foreground/90 font-medium px-4">
                  {currentStep.text}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <div className="text-muted-foreground mb-6">
                <ChefHat className="h-12 w-12 opacity-50" />
              </div>
              <p className="text-3xl md:text-5xl leading-tight font-medium">
                {currentStep.text}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[var(--saffron)] transition-all duration-300 ease-in-out" 
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          className="w-1/3 h-16 text-lg" 
          onClick={prevStep}
          disabled={currentStepIndex === 0}
        >
          Back
        </Button>
        <Button 
          size="lg" 
          className={`w-2/3 h-16 text-lg text-white font-bold transition-all ${currentStep.isBranch ? "bg-[var(--saffron)] hover:bg-[var(--saffron)]/90 animate-pulse" : "bg-primary hover:bg-primary/90"}`} 
          onClick={isLastStep ? () => router.push("/board") : nextStep}
        >
          {isLastStep ? (
            <>Finish Cook <CheckCircle2 className="ml-2 h-6 w-6" /></>
          ) : currentStep.isBranch ? (
            "Acknowledge Step"
          ) : (
            <>Next Step <ArrowRight className="ml-2 h-6 w-6" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
