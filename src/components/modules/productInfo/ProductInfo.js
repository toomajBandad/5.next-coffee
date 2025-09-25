"use client";
import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Swal from "sweetalert2";

function ProductInfo({ product }) {
  const [count, setCount] = useState(1);

  const handleQuantityChange = (delta) => {
    setCount((prev) => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.productID === product._id);

    if (index !== -1) {
      cart[index].quantity += count;
    } else {
      cart.push({
        productID: product._id,
        name: product.name,
        price: product.price,
        quantity: count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  return (
    <section className="flex flex-col gap-6 p-6">
      {/* Title */}
      <h1 className="text-3xl font-light text-black tracking-wide">{product.name}</h1>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed">{product.desc}</p>

      {/* Price & Stock */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-black">
          €{product.price.toFixed(2)}
        </div>
        <span className="text-xs font-medium text-green-500 bg-gray-200 px-3 py-1 rounded-full border-2 border-green-300">
          In Stock
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {[...Array(product.score)].map((_, i) => (
          <FaStar key={i} className="text-amber-300 w-5 h-5" />
        ))}
        {[...Array(5 - product.score)].map((_, i) => (
          <FaRegStar key={i} className="text-amber-300 w-5 h-5" />
        ))}
        <span className="text-sm text-gray-500 ml-2">
          {product.score} Stars ({product.comments?.length || 0} reviews)
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="w-10 h-10 bg-gray-100 text-black rounded border border-gray-300 hover:bg-gray-200 transition"
        >
          −
        </button>
        <span className="text-lg font-medium text-black">{count}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="w-10 h-10 bg-gray-100 text-black rounded border border-gray-300 hover:bg-gray-200 transition"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={addToCart}
        className="mt-4 px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 cursor-pointer transition"
      >
        Add to Cart
      </button>
    </section>
  );
}

export default ProductInfo;