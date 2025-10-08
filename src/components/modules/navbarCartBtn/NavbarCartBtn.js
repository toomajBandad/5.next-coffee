"use client";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";

function NavbarCartBtn() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    };

    // Initial load
    syncCart();

    // Listen for cart updates
    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  return (
    <Link href="/cart" className="relative">
      <RiShoppingCartLine className="text-2xl text-gray-700 hover:text-black" />
      <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cart.length || 0}
      </span>
    </Link>
  );
}

export default NavbarCartBtn;