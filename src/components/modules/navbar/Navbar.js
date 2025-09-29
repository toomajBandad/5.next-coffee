"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import NavbarCartBtn from "../navbarCartBtn/NavbarCartBtn";

export default function Navbar({ user, wishes, isAdmin, isLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full z-50 bg-white text-black border-b border-black sticky top-0 py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold">
            Next Coffee
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/store">Store</Link></li>
            <li><Link href="/articles">Articles</Link></li>
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

          {/* Icons + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <NavbarCartBtn />
            <Link href={user ? "/userPanel/wishlist" : "/login-register"} className="relative">
              <IoMdHeartEmpty className="text-3xl" />
              <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishes?.length || 0}
              </span>
            </Link>
            <button onClick={toggleMenu} className="lg:hidden">
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={closeMenu}>
            <div
              className="flex flex-col bg-white border-t border-black px-4 py-6 space-y-4 text-lg font-medium absolute top-16 left-0 w-full shadow-lg transition-all duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href="/" onClick={closeMenu} className="block">Home</Link>
              <Link href="/store" onClick={closeMenu} className="block">Store</Link>
              <Link href="/articles" onClick={closeMenu} className="block">Articles</Link>
              <Link href="/contact-us" onClick={closeMenu} className="block">Contact Us</Link>
              <Link href="/about-us" onClick={closeMenu} className="block">About Us</Link>

              {!isLogin ? (
                <Link href="/login-register" onClick={closeMenu} className="block">Login / Register</Link>
              ) : (
                <>
                  <Link href="/userPanel" onClick={closeMenu} className="block">User Panel</Link>
                  <Link href="/userPanel/orders" onClick={closeMenu} className="block">Orders</Link>
                  <Link href="/userPanel/tickets" onClick={closeMenu} className="block">Tickets</Link>
                  <Link href="/userPanel/comments" onClick={closeMenu} className="block">Comments</Link>
                  <Link href="/userPanel/wishlist" onClick={closeMenu} className="block">Favorites</Link>
                  <Link href="/userPanel/setting" onClick={closeMenu} className="block">Settings</Link>
                </>
              )}
              {isAdmin && (
                <Link href="/adminPanel" onClick={closeMenu} className="block">Admin Panel</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}