"use client";
import Swal from "sweetalert2";

import React from "react";
import { FaStar, FaRegStar, FaMoneyBillWave } from "react-icons/fa";

export default function WishListCard({ product }) {
  const { name, price, score, shortDesc } = product;

  const roundedScore = Math.round(score);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < roundedScore ? (
      <FaStar key={i} className="text-yellow-500" />
    ) : (
      <FaRegStar key={i} className="text-gray-300" />
    )
  );


async function removeWishItem() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to remove this product from your wishlist?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`/api/wishlists/${product._id}`, {
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
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">{shortDesc}</p>

      <p className="text-sm mb-1 flex items-center gap-2">
        <FaMoneyBillWave className="text-green-600" />
        <span className="font-semibold">${price.toFixed(2)}</span>
      </p>

      <div className="text-sm mb-4 flex items-center gap-2">
        <div className="flex gap-1">{stars}</div>
        <span className="text-gray-500">({score} / 5)</span>
      </div>

      <button
        className="bg-gray-200 text-gray-800 px-4 py-1 text-sm hover:bg-gray-300 transition rounded"
        onClick={removeWishItem}
      >
        Remove from Favorites
      </button>
    </div>
  );
}
