"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface PokemonItemProps {
  name: string;
  url: string;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name, url }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(url);
        setImageUrl(response.data.sprites.other.home.front_default);
        setWeight(response.data.weight);
        setHeight(response.data.height);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [url]);

  const weightConverter = (weight: number | null) => {
    return weight ? (weight / 10).toFixed(1) + " KG" : "N/A";
  };

  const heightConverter = (height: number | null) => {
    return height ? (height / 10).toFixed(1) + " M" : "N/A";
  };

  return (
    <div className="bg-radial-[at_50%_200%] from-[#296a13] to-[#050A1B] text-white rounded-lg p-6 shadow-lg w-64 hover:cursor-pointer hover:scale-105 transition ease-in">
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="flex justify-center">
            <Image src={imageUrl} alt={name} width={200} height={200} className="object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-center capitalize mt-2">
            • {name} •
          </h2>

          <div className="flex justify-between items-center mt-4 px-4 text-gray-300 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{heightConverter(height)}</span>
              <span className="text-xs">Altura</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{weightConverter(weight)}</span>
              <span className="text-xs">Peso</span>
            </div>
          </div>

          <button className="w-full mt-5 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition hover:cursor-pointer">
            More Details
          </button>
        </>
      )}
    </div>
  );
};

export default PokemonItem;
