import React from "react";
import Link from "next/link";
import wishListModel from "@/models/wishList";
import { FaAngleDown } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { authUser } from "@/utils/authUser";
import NavbarCartBtn from "../navbarCartBtn/NavbarCartBtn";

export default async function Navbar() {
  const user = await authUser();
  const isLogin = !!user;
  let isAdmin = false;
  if (isLogin) {
    if (user.role === "ADMIN") {
      isAdmin = true;
    }
  }
  const wishes =
    user && (await wishListModel.find({ userId: user._id }).lean());

  return (
    <nav className="w-full z-50 bg-white text-black border-b border-black sticky top-0 py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-60 items-center h-16">
          <div className="text-4xl font-bold">
            <Link href="/">Next Coffee</Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/store">Store</Link>
            </li>
            <li>
              <Link href="/articles">Articles</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>

            {!isLogin ? (
              <li>
                <Link href="/login-register">Login / Register</Link>
              </li>
            ) : (
              <li className="relative group">
                <div className="flex items-center gap-1 cursor-pointer">
                  Account <FaAngleDown />
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
              <li>
                <Link href="/adminPanel">Admin Panel</Link>
              </li>
            )}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <NavbarCartBtn />

            <Link href="/userPanel/wishlist" className="relative">
              {user && (
                <>
                  <IoMdHeartEmpty className="text-3xl" />
                  <span className="absolute -top-2 -left-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishes?.length || 0}
                  </span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
