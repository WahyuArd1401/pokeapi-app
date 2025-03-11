import React from "react";
import PokemonItem from "./PokemonItem";

interface PokemonListProps {
  pokemons: { name: string; url: string }[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonItem key={pokemon.name} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
