import React from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

function Topbar() {
  return (
    <nav className="w-full z-50 bg-white text-black border-b border-black sticky top-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-60 items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">Next - Admin Panel</Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/category">Store</Link>
            </li>
            <li>
              <Link href="/blogs">Weblog</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/rules">Rules</Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <IoCartOutline className="text-2xl" />
              <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </Link>
            <Link href="/favorites" className="relative">
              <IoMdHeartEmpty className="text-2xl" />
              <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
