"use client";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function NavbarCartBtn() {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
  return (
    <Link href="/cart" className="relative">
      <IoCartOutline className="text-3xl" />
      <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cart?.length || 0}
      </span>
    </Link>
  );
}

export default NavbarCartBtn;
