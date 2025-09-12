import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function ProductInfo({ product }) {
  return (
    <section className="space-y-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        {product.name}
      </h1>

      {/* Description */}
      <p className="text-base text-gray-700 leading-relaxed">{product.desc}</p>

      {/* Price & Availability */}
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold text-gray-800">
          {product.price.toLocaleString()} <span className="text-lg">$</span>
        </div>
        <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
          In Stock
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-2">
        {[...Array(product.score)].map((_, i) => (
          <FaStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
        {[...Array(5 - product.score)].map((_, i) => (
          <FaRegStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
        <span className="text-sm text-gray-600">
          {product.score} Stars ({product.comments.length} user reviews)
        </span>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-200 ease-in-out">
        Add to Cart
      </button>
    </section>
  );
}

export default ProductInfo;
