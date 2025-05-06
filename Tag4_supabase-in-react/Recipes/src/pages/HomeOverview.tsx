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
  const [topRatedRecipes, setTopRatedRecipes] = useState<Recipe[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);

  //* note to self: Die Destrukturierung von { data, error } funktioniert nur, wenn man das Ergebnis eines Promises direkt zuweist, z. B. mit await.
  useEffect(() => {
    const fetchTopRatedRecipes = async () => {
      const { data: topRatedRecipes, error: topRatedError } = await supabase
        .from("recipes")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      if (topRatedError) {
        console.error("Error fetching recipes:", topRatedError);
      } else {
        setTopRatedRecipes(topRatedRecipes || []);
        // Log the fetched recipes to the console
        console.log("Fetched recipes:", topRatedRecipes);
      }
    };
    fetchTopRatedRecipes();
  }, []);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      const { data: latestRecipes, error: latestError } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (latestError) {
        console.error("Error fetching recipes:", latestError);
      } else {
        setLatestRecipes(latestRecipes || []);
        // Log the fetched recipes to the console
        console.log("Fetched recipes:", latestRecipes);
      }
    };
    fetchLatestRecipes();
  }, []);

  return (
    <>
      <h2>Die beliebtesten Rezepte</h2>
      {topRatedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3 className="font-bold">{recipe.name}</h3>
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
          <Link to={`/recipes/${recipe.id}`} className="text-red-400 underline">
            Zum Rezept
          </Link>
        </div>
      ))}
      <div>
        <h2>Neuste Rezepte</h2>
        {latestRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3 className="font-bold">{recipe.name}</h3>
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
