"use client";

import { useRouter } from "next/navigation";
import { usePlanStore } from "@/store/planStore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function PantryPage() {
  const router = useRouter();
  const { recipe } = usePlanStore();
  const [copied, setCopied] = useState(false);

  if (!recipe) {
    return (
      <div className="container py-12 text-center">
        <p>No active recipe. Please generate one first.</p>
        <Button className="mt-4" onClick={() => router.push("/roster")}>Go to Roster</Button>
      </div>
    );
  }

  // Group ingredients by category
  const grouped = recipe.ingredients.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, typeof recipe.ingredients>);

  const handleCopy = () => {
    // Format clearly for Whatsapp
    let text = `*Sanjha Chulha Grocery List*\nRecipe: ${recipe.title}\n\n`;
    for (const [category, items] of Object.entries(grouped)) {
      text += `*${category}*\n`;
      for (const item of items) {
        text += `- ${item.amount} ${item.item}\n`;
      }
      text += `\n`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/board")}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Pantry List</h1>
          <p className="text-muted-foreground flex items-center">
             Aggregated requirements for <strong className="ml-1 text-foreground">{recipe.title}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category}>
            <CardHeader className="py-4 bg-muted/30">
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {items.map((item, idx) => (
                  <li key={idx} className="flex justify-between p-4 items-center hover:bg-muted/10 transition-colors">
                    <span className="font-medium">{item.item}</span>
                    <span className="font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-6 sticky bottom-6 z-10 w-full flex justify-center">
        <Button 
          size="lg" 
          onClick={handleCopy}
          className={`shadow-2xl h-14 px-8 text-lg w-full md:w-auto font-bold transition-all ${copied ? "bg-[var(--emerald)] hover:bg-[var(--emerald)]/90 text-white" : "bg-primary hover:bg-primary/90 text-white"}`}
        >
          {copied ? (
            <>
              <Check className="mr-2 w-5 h-5" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="mr-2 w-5 h-5" />
              Copy Grocery List
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
