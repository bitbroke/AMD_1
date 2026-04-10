import { create } from "zustand";

interface RecipeStep {
  text: string;
  isBranch?: boolean;
  targetProfile?: string;
}

interface Nutrition {
  profileRef: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

interface Ingredient {
  item: string;
  amount: string;
  category: string;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition: Nutrition[];
  validation: string;
}

interface PlanState {
  recipe: GeneratedRecipe | null;
  setRecipe: (recipe: GeneratedRecipe) => void;
  clearRecipe: () => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  recipe: null,
  setRecipe: (recipe) => set({ recipe }),
  clearRecipe: () => set({ recipe: null }),
}));
