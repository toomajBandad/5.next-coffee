"use client";

import Swal from "sweetalert2";
import React from "react";
import { FaStar, FaRegStar, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

export default function WishListCard({ product }) {
  const { name, price, score, shortDesc, image } = product;

  const roundedScore = Math.round(score);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < roundedScore ? (
      <FaStar key={i} className="text-yellow-500" />
    ) : (
      <FaRegStar key={i} className="text-gray-300" />
    )
  );

  async function removeWishItem(e) {
    e.stopPropagation();

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
          Swal.fire(
            "Oops!",
            data.message || "Failed to remove product.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        Swal.fire(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
    }
  }

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300">
      <Link href={`/products/${product._id}`}>
        <div className="cursor-pointer">
          <div className="h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-1">{name}</h2>
            <p className="text-sm text-gray-600 mb-2">{shortDesc}</p>

            <p className="text-sm mb-1 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-600" />
              <span className="font-semibold">${price.toFixed(2)}</span>
            </p>

            <div className="text-sm mb-4 flex items-center gap-2">
              <div className="flex gap-1">{stars}</div>
              <span className="text-gray-500">({score} / 5)</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          className="bg-red-100 text-red-700 px-4 py-1 text-sm hover:bg-red-200 transition rounded"
          onClick={removeWishItem}
        >
          Remove from Favorites
        </button>
      </div>
    </div>
  );
}