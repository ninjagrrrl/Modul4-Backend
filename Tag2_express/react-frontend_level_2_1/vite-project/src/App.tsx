import { useState, useEffect } from "react";

import "./App.css";

export default function App() {
  const [people, setPeople] = useState<{ name: string }[]>([]);
  const [starship, setStarship] = useState<{ name: string }[]>([]);

  // Fetch für people
  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => console.error("Error fetching people:", error));
  }, []);

  //Fetch für starship
  useEffect(() => {
    fetch("http://localhost:3000/starship")
      .then((response) => response.json())
      .then((data) => {
        setStarship(data);
      })
      .catch((error) => console.error("Error fetching starship:", error));
  }, []);

  return (
    <>
      <h2>People from Star Wars</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
      <h2>Starhips from Star Wars</h2>
      <ul>
        {starship.map((starship, index) => (
          <li key={index}>{starship.name}</li>
        ))}
      </ul>
    </>
  );
}
