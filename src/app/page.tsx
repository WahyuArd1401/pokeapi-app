"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Image from "next/image";
import PokemonList from "@/components/PokemonList";
import Jumbotron from "@/components/Jumbotron";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_POKEMON_API_URL;
  const logoUrl = `/images/pokemon-text.png`;

  const jumbotronImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png`;

  const fetchData = async () => {
    try {
      const response = await axios.get<{ results: Pokemon[] }>(apiURL!);
      setData(response.data.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPokemons = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (apiURL) {
      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black pb-10">
      {/* Jumbotron */}
      <div className="bg-linear-to-r from-[#5ad531] to-[#2c9908] px-20 lg:px-40 py-5">
        <div className="flex justify-center">
          <Image
            src={logoUrl}
            alt="Logo"
            width={300}
            height={300}
            objectFit="contain"
          />
        </div>
        {!isLoading && !isError && data.length > 0 && (
          <Jumbotron name={data[0].name} imageUrl={jumbotronImageUrl} />
        )}
      </div>
      <div className="relative overflow-hidden h-10 mb-10">
        <div className="absolute z-3 inset-x-0 bottom-0 h-20 bg-linear-to-r from-[#5ad531] to-[#2c9908] px-40 py-5 rounded-b-[50%]"></div>
        <div className="absolute z-2 inset-x-0 bottom-0 h-20 bg-linear-to-r from-[#45a325] to-[#207105] px-40 py-5 rounded-b-[30%]"></div>
        <div className="absolute z-1 inset-x-0 bottom-0 h-20 bg-linear-to-r from-[#32781b] to-[#185604] px-40 py-5 rounded-b-[10%]"></div>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 p-3 rounded-lg border border-gray-400 text-lg shadow-md focus:outline-none focus:border-green-500 text-white"
        />
      </div>
      {/* Pokemon List */}
      <Suspense
        fallback={
          <p className="text-center text-white">Loading Pokémon List...</p>
        }
      >
        {filteredPokemons.length === 0 ? (
          <p className="text-center text-white text-lg mt-5">
            Tidak ada Pokémon yang ditemukan.
          </p>
        ) : (
          <PokemonList pokemons={filteredPokemons} />
        )}
      </Suspense>
    </div>
  );
}
