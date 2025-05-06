import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Recipe = {
  category_id: string;
  created_at: string | null;
  description: string;
  id: string;
  instructions: string;
  name: string;
  servings: number;
  image_Url?: string;
  rating?: number;
};

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .then((result) => {
        if (result.error) {
          console.error("Error fetching recipes:", result.error);
        } else {
          setRecipes(result.data);
          // Log the fetched recipes to the console
          console.log("Fetched recipes:", result.data);
        }
      });
  }, []);

  return (
    <>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            {recipe.image_Url && (
              <div className="w-[400px] h-[400px] overflow-hidden relative">
                <img
                  src={recipe.image_Url}
                  alt={recipe.name}
                  className="w-[400px] h-[400px] object-cover object-center"
                />
              </div>
            )}
            <p className="text-red-400">{recipe.description}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Rating: {recipe.rating}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
