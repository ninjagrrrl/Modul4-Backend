import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";

type Recipe = {
  category_id: string;
  created_at: string | null;
  description: string;
  id: string;
  image_url: string | null;
  instructions: string;
  name: string;
  rating: number | null;
  servings: number;
};

function HomeOverview() {
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
            <h2 className="font-bold">{recipe.name}</h2>
            {recipe.image_url && (
              <div className="w-[400px] h-[400px] overflow-hidden relative">
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-[400px] h-[400px] object-cover object-center"
                />
              </div>
            )}
            <p>{recipe.description}</p>
            <Link
              to={`/recipes/${recipe.id}`}
              className="text-red-400 underline"
            >
              Zum Rezept
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeOverview;
