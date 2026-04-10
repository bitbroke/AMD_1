"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFamilyStore } from "@/store/familyStore";
import { usePlanStore } from "@/store/planStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function BoardPage() {
  const router = useRouter();
  const { members } = useFamilyStore();
  const { recipe, setRecipe } = usePlanStore();
  const [loading, setLoading] = useState(!recipe);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recipe) return; // Already have a recipe, do not refetch

    if (members.length === 0) {
      router.push("/roster");
      return;
    }

    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ members }),
        });
        const data = await res.json();
        
        if (data.recipe) {
          setRecipe(data.recipe);
        } else {
          setError("Malformed response from AI");
        }
      } catch (err) {
        setError("Failed to generate plan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [members, recipe, router, setRecipe]);

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--saffron)]" />
        <h2 className="text-xl font-medium animate-pulse">Vertex AI is mathematically overlapping diets...</h2>
        <p className="text-muted-foreground text-sm">Validating constraints for {members.length} members.</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container max-w-screen-md mx-auto py-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Could not generate plan.</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.push("/roster")}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">The Chulha Board</h1>
        <p className="text-muted-foreground">Your unified family plan is ready.</p>
      </div>

      <Card className="border-2 border-[var(--saffron)] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--saffron)]" />
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{recipe.title}</CardTitle>
              <CardDescription className="text-md mt-2">{recipe.description}</CardDescription>
            </div>
            <div className="flex items-center text-sm font-medium bg-muted px-3 py-1.5 rounded-full whitespace-nowrap">
              <Clock className="h-4 w-4 mr-2" />
              {recipe.totalTime} Total
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg flex items-center mb-4">
              <CheckCircle2 className="h-5 w-5 mr-2 text-[var(--emerald)]" />
              Nutrition & Portion Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipe.nutrition.map((nut, idx) => (
                <div key={idx} className="bg-muted/40 p-4 rounded-lg flex flex-col justify-between">
                  <span className="font-medium">{nut.profileRef}</span>
                  <div className="text-2xl font-bold mt-2">{nut.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span></div>
                  <div className="text-xs text-muted-foreground mt-1 flex justify-between space-x-2">
                    <span>P: {nut.protein}</span>
                    <span>C: {nut.carbs}</span>
                    <span>F: {nut.fat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-muted/40 p-4 rounded-lg border">
            <h4 className="font-semibold text-sm mb-1 text-[var(--emerald)]">Validation Certificate</h4>
            <p className="text-sm text-foreground/80">{recipe.validation}</p>
          </div>
        </CardContent>
        <CardFooter className="flex md:flex-row flex-col gap-4 border-t pt-6 bg-muted/20">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push("/pantry")}
          >
            Export Ingredients
          </Button>
          <Button 
            className="w-full bg-[var(--saffron)] text-white hover:bg-[var(--saffron)]/90" 
            onClick={() => router.push("/kitchen")}
          >
            Enter Active Kitchen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
