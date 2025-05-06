import { supabase } from "@/lib/supabaseClient";
import type { RecipeDetails } from "@/types/RecipeDetailsTypes";

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

//   `
//   category_id,
//   created_at,
//   description,
//   id,
//   image_url,
//   instructions,
//   name,
//   rating,
//   servings,
//   ingredients (
//     additional_info,
//     created_at,
//     id,
//     name,
//     quantity,
//     recipe_id,
//     unit
//     ),
//   categories (
//     id,
//     name,
//     created_at
//   )
// `
