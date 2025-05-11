import { fetchRecipeWithDetails } from "@/components/fetch-recipes-details";
import type { RecipeDetails } from "@/types/recipe-details-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/client";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchRecipeWithDetails(id).then((data) => {
      if (data) setRecipe(data);
    });
  }, [id]);

  if (!recipe) return <p>Loading…</p>;

  //TODO - handleDeleteRecipe Fn in RecipeCreateForm.tsx auslagern
  const handleDeleteRecipe = async () => {
    if (!id) return;
    await supabase.from("recipes").delete().eq("id", id);
    console.log("Recipe deleted");
  };

  return (
    <div>
      {recipe.image_url && (
        <div className="w-[400px] h-[400px] overflow-hidden relative">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-[400px] h-[400px] object-cover object-center"
          />
        </div>
      )}
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>Kategorie: {recipe.categories.name}</p>
      <h2>Zutaten</h2>
      <ul>
        {recipe.ingredients.map((ing) => (
          <li key={ing.id}>
            {ing.name} – {ing.quantity} {ing.unit}
          </li>
        ))}
      </ul>
      <p>Bewertung: {recipe.rating}</p>
      <p>Erstellt am: {recipe.created_at}</p>
      {/* TODO - Delete Button in RecipeCreateForm.tsx auslagern  */}
      <button
        onClick={handleDeleteRecipe}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}
