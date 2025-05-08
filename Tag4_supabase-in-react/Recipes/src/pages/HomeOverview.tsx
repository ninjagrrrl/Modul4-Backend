import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function HomeOverview() {
  //* note to self: Die Destrukturierung von { data, error } funktioniert nur, wenn man das Ergebnis eines Promises direkt zuweist, z. B. mit await.
  const {
    data: topRatedRecipes = [],
    error: topRatedError,
    isPending: isTopRatedPending,
  } = useQuery({
    queryKey: ["topRatedRecipes"],
    queryFn: async () => {
      const result = await supabase
        .from("recipes")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);
      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
  });

  const {
    data: latestRecipes = [],
    error: latestError,
    isLoading: isLatestPending,
  } = useQuery({
    queryKey: ["latestRecipes"],
    queryFn: async () => {
      const result = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (result.data) {
        return result.data;
      } else {
        throw result.error;
      }
    },
  });

  if (isTopRatedPending || isLatestPending) {
    return <p>Loading...</p>;
  }

  if (topRatedError || latestError) {
    return <p>Leider kaputt</p>;
  }

  return (
    <>
      <h2 className="text-4xl font-medium">Die beliebtesten Rezepte</h2>
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
        <h2 className="text-4xl font-medium">Neueste Rezepte</h2>
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
