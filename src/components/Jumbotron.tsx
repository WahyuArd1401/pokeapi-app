import React from "react";
import Image from "next/image";

interface JumbotronProps {
  name: string;
  imageUrl: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 mb-10">
      {/* Konten Kiri (Teks) */}
      <div className="flex-1 flex flex-col justify-center text-center md:text-left p-4 gap-4 text-white">
        <h1 className="capitalize text-6xl font-bold">{name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          quis. Fugit ipsam obcaecati rem culpa quia dolore voluptas expedita
          id? Dolores eos unde deleniti atque numquam magnam tenetur, impedit
          provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Nam soluta enim minus corrupti accusamus corporis magni porro sed?
          Enim voluptatem inventore natus consequatur necessitatibus impedit
          cupiditate ullam earum a quidem!
        </p>
        <button className="px-5 py-2 bg-black rounded-lg font-semibold text-xl hover:cursor-pointer hover:scale-105 transition ease-in">
          More Details
        </button>
      </div>

      {/* Konten Kanan (Gambar) */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain drop-shadow-[35px_35px_30px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
