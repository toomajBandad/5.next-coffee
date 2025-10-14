"use client";

import Swal from "sweetalert2";
import React from "react";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import Link from "next/link";

export default function WishListCard({ product }) {
  const {
    _id,
    name,
    brand,
    price,
    score,
    weight,
    type,
    origin,
    roastLevel,
    smell,
    stock,
    image,
  } = product;

  const roundedScore = Math.min(5, Math.max(0, Math.round(score)));
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < roundedScore ? (
      <FaStar key={i} className="text-yellow-400 text-xs" />
    ) : (
      <FaRegStar key={i} className="text-gray-300 text-xs" />
    )
  );

  async function removeWishItem(e) {
     e.preventDefault(); 
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this product from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/wishlists/${_id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (data.success) {
          await Swal.fire({
            title: "Removed!",
            text: "Product removed from wishlist successfully.",
            icon: "success",
          });
          window.location.reload();
        } else {
          Swal.fire("Oops!", data.message || "Failed to remove product.", "error");
        }
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        Swal.fire("Error", "An error occurred. Please try again later.", "error");
      }
    }
  }

  return (
    <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 p-2 max-w-md">
      <Link href={`/products/${_id}`} className="flex items-center gap-3 w-full">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">{name}</h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div><strong>Origin:</strong> {origin}</div>
            <div><strong>Roast:</strong> {roastLevel}</div>
            <div><strong>Smell:</strong> {smell}</div>
            <div><strong>Type:</strong> {type}</div>
            <div><strong>Weight:</strong> {weight}g</div>
            <div><strong>Stock:</strong> {stock}</div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-green-700 font-semibold">{price.toFixed(2)} $</span>
            <div className="flex gap-1">{stars}</div>
          </div>

          <button
            className="absolute bottom-0 right-0 bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-200 transition"
            onClick={removeWishItem}
            title="Remove from wishlist"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      </Link>
    </div>
  );
}