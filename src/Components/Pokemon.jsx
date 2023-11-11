import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "animate.css/animate.min.css";
import { typeColorMap } from "../typeColorMap";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonData(data);
          setShowPokemon(true);
        });
    }
  }, [pokemon]);

  // Definir una función para obtener un color de fondo basado en el tipo del Pokémon
  const getBackgroundColor = () => {
   

    const type = pokemonData?.types[0]?.type.name || "normal"; 
    return typeColorMap[type];
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${getBackgroundColor()}`}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 capitalize">Pokédex</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Insert Pokémon Name"
            onChange={(e) => setPokemon(e.target.value.toLowerCase())}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        {showPokemon && pokemonData && pokemonData.sprites && (
          <div className="animate__animated animate__fadeIn">
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="mx-auto mb-4 rounded-md"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2 capitalize text-indigo-600">
                {pokemonData.name}
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Type:</span> {pokemonData.types[0].type.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Weight:</span> {pokemonData.weight} kg
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Height:</span> {pokemonData.height / 10} m
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Ability:</span> {pokemonData.abilities[0].ability.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Base Experience:</span> {pokemonData.base_experience}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Moves:</span> {pokemonData.moves[0].move.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Species:</span> {pokemonData.species.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Game Index:</span> {pokemonData.game_indices[0].game_index}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
