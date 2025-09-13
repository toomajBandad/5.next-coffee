import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import image from "@images/cards/4.jpg";

function Card({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="relative w-full h-64 ">
        <Image src={image} alt="image alt" fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <div className="text-md font-bold text-gray-900">€{product.price}</div>
      </div>
    </div>
  );
}

export default Card;
