import { fetchRecipeWithDetails } from "@/hooks/fetchRecipeWithDetails";
import type { RecipeDetails } from "@/types/RecipeDetailsTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    </div>
  );
}
