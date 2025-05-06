// import { type Tables } from "./supabase"; //* importiere die automatisch generierten Typen aus supabase.ts

// *definiert einen neuen Typ für Recipe, der auch ingredients und category beinhaltet
// export type RecipeDetails = Tables<"recipes"> & {
//   category: Tables<"categories">;
//   ingredients: Tables<"ingredients">[];
// };

export type RecipeDetails = {
  id: string;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  image_url: string | null;
  rating: number | null;
  created_at: string | null;
  category_id: string;
  ingredients: {
    id: string;
    name: string;
    quantity: number | null;
    unit: string | null;
    additional_info: string | null;
    created_at: string | null;
    recipe_id: string;
  }[];
  categories: {
    id: string;
    name: string;
    created_at: string | null;
  };
};
