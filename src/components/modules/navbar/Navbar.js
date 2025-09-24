import React from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

export default function Navbar({ isLogin ,isAdmin}) {
  return (
    <nav className="w-full z-50 bg-white text-black border-b border-black sticky top-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-60 items-center h-16">
          <div className="text-2xl font-bold">
            <Link href="/">Next Coffee</Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/store">Store</Link></li>
            <li><Link href="/blogs">Weblog</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
         
            {!isLogin ? (
              <li><Link href="/login-register">Login / Register</Link></li>
            ) : (
            
           <li className="relative group">
                <div className="flex items-center gap-1 cursor-pointer">
                  Account <FaAngleDown />
                </div>
                <div className="absolute left-0 top-full bg-white border border-black shadow-lg flex-col gap-3 text-left p-5 w-40 z-10 hidden group-hover:flex transition-all duration-200 ease-in-out">
                  <Link href="/userPanel" className="hover:underline">User Panel</Link>
                  <Link href="/userPanel/orders" className="hover:underline">Orders</Link>
                  <Link href="/userPanel/tickets" className="hover:underline">Tickets</Link>
                  <Link href="/userPanel/comments" className="hover:underline">Comments</Link>
                  <Link href="/userPanel/wishlist" className="hover:underline">Favorites</Link>
                  <Link href="/userPanel/setting" className="hover:underline">Settings</Link>
                </div>
              </li>
            )}
              {isAdmin && (
                 <li><Link href="/adminPanel">Admin Panel</Link></li>
              )}

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