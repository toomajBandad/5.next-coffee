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
    <section className="flex flex-col gap-3 p-6 bg-white rounded-lg">
      {/* Product Title */}
      <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed">{product.desc}</p>

      {/* Price & Stock */}
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold text-gray-800">
          ${product.price.toLocaleString()}
        </div>
        <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
          In Stock
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {[...Array(product.score)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" />
        ))}
        {[...Array(5 - product.score)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400 w-5 h-5" />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {product.score} Stars ({product.comments.length} reviews)
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Decrease quantity"
          onClick={() => handleQuantityChange(-1)}
          className="w-10 h-10 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          −
        </button>
        <span className="text-lg font-medium">{count}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => handleQuantityChange(1)}
          className="w-10 h-10 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div>
        <button
          onClick={addToCart}
          className="mt-4 p-3 bg-black text-white font-semibold rounded hover:bg-gray-900 transition w-30"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductInfo;
