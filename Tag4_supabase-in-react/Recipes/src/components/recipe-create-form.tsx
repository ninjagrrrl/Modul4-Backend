import { useState } from "react";
import { supabase } from "@/lib/client";
import { queryClient } from "@/main";

//TODO - handleDeleteRecipe FN einbauen
//TODO - handleUpdateRecipe FN einbauen
export default function RecipeCreateForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(1);
  const [category_id, setCategory_id] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      instructions.trim().length === 0 ||
      servings === 0 ||
      category_id.trim().length === 0
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
        category_id,
      })
      .then(() => {
        setName("");
        setDescription("");
        setServings(1);
        setInstructions("");
        setCategory_id("");
        setIsPending(false);
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
      });
  };
  return (
    <div>
      <form>
        <h2>Erstelle ein neues Rezept!</h2>
        <input
          type="text"
          name="recipe-name"
          placeholder="Wie heißt dein Gericht?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="recipe-description"
          placeholder="Kurze Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="recipe-servings"
          placeholder="Für wie viele Personen?"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value))}
        />
        <textarea
          name="recipe-instructions"
          placeholder="Zubereitung"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <select
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="" disabled>
            Bitte Kategorie auswählen
          </option>
          <option value="98e7251d-9834-4099-92ae-564176c534f6">
            Vegetarisch
          </option>
          <option value="def7edd0-3bff-47e7-91e5-f72bc06a43ea">Vegan</option>
          <option value="0ed832ae-416f-4d92-9d34-e695fd6cfa48">
            Glutenfrei
          </option>
          <option value="c9931261-ad1b-459d-ab31-3ef6051ee203">
            Frühstück
          </option>
          <option value="19bfa4ae-2726-45b2-a410-93386d64b958">
            Vorspeise
          </option>
          <option value="aa748b4b-2cfc-40a1-b578-2f582b72cb1c">
            Hauptspeise
          </option>
          <option value="1540c417-b4e0-4797-819d-db64c29692af">Dessert</option>
        </select>
        <button disabled={isPending} onClick={handleSubmit} type="submit">
          Rezept Erstellen
        </button>
      </form>
    </div>
  );
}
