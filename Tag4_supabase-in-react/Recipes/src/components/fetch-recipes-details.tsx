import { supabase } from "@/lib/client";
import type { RecipeDetails } from "@/types/recipe-details-types";

// Funktion, um ein Rezept mit Zutaten und Kategorie zu holen

export const fetchRecipeWithDetails = async (
  id: string
): Promise<RecipeDetails | null> => {
  const superbaseResponse = await supabase
    .from("recipes")
    .select(
      `
    *,
    ingredients (*),
    categories (*)
  `
    )
    .eq("id", id)
    .single();

  return superbaseResponse.data;
};
