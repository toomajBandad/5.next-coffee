import React from "react";
import Image from "next/image";
import image from "@images/cards/3.jpg";

function ArticleCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <div className="text-md font-bold text-gray-900">€{product.price}</div>
      </div>
    </div>
  );
}

export default ArticleCard;
