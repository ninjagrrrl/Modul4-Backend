import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { queryClient } from "@/main";

//TODO - handleDeleteRecipe FN einbauen
//TODO - handleUpdateRecipe FN einbauen
export default function RecipeCreateForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      instructions.trim().length === 0 ||
      servings === 0
    ) {
      alert("Bitte fülle alle Felder aus.");
      return;
    }

    setIsPending(true);
    supabase
      .from("recipes")
      .insert({
        name,
        description,
        servings,
        instructions,
        category_id: "1",
      })
      .then(() => {
        setName("");
        setDescription("");
        setServings(1);
        setInstructions("");
        setIsPending(false);
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
      });
  };
  return (
    <div>
      <form>
        //TODO - Formularfelder bauen
        <h2>Erstelle ein neues Rezept!</h2>
        <button disabled={isPending} onClick={handleSubmit} type="submit">
          Rezept Erstellen
        </button>
      </form>
    </div>
  );
}
