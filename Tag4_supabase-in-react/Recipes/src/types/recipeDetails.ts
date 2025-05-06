import { type Tables } from "./supabase"; //* importiere die automatisch generierten Typen aus supabase.ts

export type RecipeDetails = Tables<"recipes"> & {
  category: Tables<"categories">;
  ingredients: Tables<"ingredients">[];
};
