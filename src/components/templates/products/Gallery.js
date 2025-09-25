
import React from "react";

export default function Gallery({ product }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl ">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-end p-6">
        <div className="text-white drop-shadow">
          <h2 className="text-2xl sm:text-3xl font-light tracking-wide">
            {product.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-200">{product.shortDesc}</p>
        </div>
      </div>
    </div>
  );
}