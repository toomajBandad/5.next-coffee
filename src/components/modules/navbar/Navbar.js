"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import NavbarCartBtn from "../navbarCartBtn/NavbarCartBtn";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/utils/useAuthUser";

export default function Navbar({ user, wishes, isAdmin, isLogin }) {
  const router = useRouter();

  useEffect(() => {
    const hydrate = async () => {
      const data = await useAuthUser();
      if (data?.success) {
        router.refresh(); // ✅ soft reload
        // or: window.location.reload(); // ✅ hard reload
      }
    };

    hydrate();
  }, [router]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full z-10 bg-white text-black border-b border-black sticky top-0 py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold">
            Next Coffee
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6">
            <li className="relative group">
              <Link className="block hover:text-gray-500" href="/">
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Home
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link className="block hover:text-gray-500" href="/store">
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Store
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link className="block hover:text-gray-500" href="/articles">
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Article
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link className="block hover:text-gray-500" href="/contact-us">
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Contact us
                </span>
              </Link>
            </li>
            <li className="relative group">
              <Link className="block hover:text-gray-500" href="/about-us">
                <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  About us
                </span>
              </Link>
            </li>

            {!isLogin ? (
              <li className="relative group">
                <Link
                  className="block hover:text-gray-500"
                  href="/login-register"
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                    Login / Register
                  </span>
                </Link>
              </li>
            ) : (
              <li className="relative group">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-500">
                   <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                    Account
                  </span> <FaAngleDown />
                </div>
                <div className="absolute left-0 top-full bg-white border border-black shadow-lg flex-col gap-3 text-left p-5 w-40 z-10 hidden group-hover:flex transition-all duration-200 ease-in-out">
                  <Link href="/userPanel" className="hover:underline">
                    User Panel
                  </Link>
                  <Link href="/userPanel/orders" className="hover:underline">
                    Orders
                  </Link>
                  <Link href="/userPanel/tickets" className="hover:underline">
                    Tickets
                  </Link>
                  <Link href="/userPanel/comments" className="hover:underline">
                    Comments
                  </Link>
                  <Link href="/userPanel/wishlist" className="hover:underline">
                    Favorites
                  </Link>
                  <Link href="/userPanel/setting" className="hover:underline">
                    Settings
                  </Link>
                </div>
              </li>
            )}
            {isAdmin && (
              <li className="relative group">
                <Link className="block hover:text-gray-500" href="/adminPanel">
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 group-hover:after:w-full">
                    Admin Panel
                  </span>
                </Link>
              </li>
            )}
          </ul>

          {/* Icons + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <NavbarCartBtn />
            <Link
              href={user ? "/userPanel/wishlist" : "/login-register"}
              className="relative"
            >
              <IoMdHeartEmpty className="text-3xl" />
              <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishes?.length || 0}
              </span>
            </Link>
            <button onClick={toggleMenu} className="lg:hidden">
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
          >
            <div
              className="flex flex-col bg-white border-t border-black px-4 py-6 space-y-4 text-lg font-medium absolute top-16 left-0 w-full shadow-lg transition-all duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href="/" onClick={closeMenu} className="block">
                Home
              </Link>
              <Link href="/store" onClick={closeMenu} className="block">
                Store
              </Link>
              <Link href="/articles" onClick={closeMenu} className="block">
                Articles
              </Link>
              <Link href="/contact-us" onClick={closeMenu} className="block">
                Contact Us
              </Link>
              <Link href="/about-us" onClick={closeMenu} className="block">
                About Us
              </Link>

              {!isLogin ? (
                <Link
                  href="/login-register"
                  onClick={closeMenu}
                  className="block"
                >
                  Login / Register
                </Link>
              ) : (
                <>
                  <Link href="/userPanel" onClick={closeMenu} className="block">
                    User Panel
                  </Link>
                  <Link
                    href="/userPanel/orders"
                    onClick={closeMenu}
                    className="block"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/userPanel/tickets"
                    onClick={closeMenu}
                    className="block"
                  >
                    Tickets
                  </Link>
                  <Link
                    href="/userPanel/comments"
                    onClick={closeMenu}
                    className="block"
                  >
                    Comments
                  </Link>
                  <Link
                    href="/userPanel/wishlist"
                    onClick={closeMenu}
                    className="block"
                  >
                    Favorites
                  </Link>
                  <Link
                    href="/userPanel/setting"
                    onClick={closeMenu}
                    className="block"
                  >
                    Settings
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link href="/adminPanel" onClick={closeMenu} className="block">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
