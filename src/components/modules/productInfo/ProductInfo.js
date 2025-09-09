import React from "react";

function ProductInfo() {
  return (
    <section>
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Colombian Coffee Beans
      </h1>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        A bold and aromatic blend sourced from the highlands of Colombia.
        Perfect for espresso, pour-over, or your morning ritual.
      </p>

      {/* Price & Availability */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold text-black">€12.99</div>
        <div className="text-sm text-green-600 font-medium">In Stock</div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">4.9 (128 reviews)</span>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
        Add to Cart
      </button>
    </section>
  );
}

export default ProductInfo;
