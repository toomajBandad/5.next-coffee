"use client";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

function AddToWishList({ productID }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFavoriteClick = async () => {
    if (!user?._id) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must log in to add items to your wishlist.",
      });
      return;
    }

    const wish = {
      userId: user._id,
      productId: productID,
    };

    try {
      const res = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wish),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: "This item has been added to your favorites.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add item to wishlist.",
        });
        console.error("Request failed with status:", res.status);
      }
    } catch (error) {
      console.error("Failed to send wishlist request:", error);
    }
  };

  return (
    <div className="mt-2 mx-6">
      <button
        onClick={handleFavoriteClick}
        className="inline-flex items-center gap-3 px-6 py-2 border border-red-700 rounded-md text-red-700 font-medium shadow-sm hover:bg-red-100 transition duration-200 cursor-pointer"
      >
        <FaRegHeart className="text-lg" />
        <span>Add to Favorites</span>
      </button>
    </div>
  );
}

export default AddToWishList;