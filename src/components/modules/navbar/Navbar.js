"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import NavbarCartBtn from "../navbarCartBtn/NavbarCartBtn";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/utils/useAuthUser";
import NavbarMobile from "../navbarMobile/NavbarMobile";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "Article", href: "/articles" },
  { label: "Contact us", href: "/contact-us" },
  { label: "About us", href: "/about-us" },
];

const userPanelLinks = [
  { label: "User Panel", href: "/userPanel" },
  { label: "Orders", href: "/userPanel/orders" },
  { label: "Tickets", href: "/userPanel/tickets" },
  { label: "Comments", href: "/userPanel/comments" },
  { label: "Favorites", href: "/userPanel/wishlist" },
  { label: "Settings", href: "/userPanel/setting" },
];

export default function Navbar({ user, wishes, isAdmin, isLogin }) {
  const router = useRouter();

  useEffect(() => {
    const hydrate = async () => {
      const data = await useAuthUser();
      if (data?.success) {
        router.refresh();
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
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-3xl font-bold">
            Next Coffee
          </Link>

          <ul className="hidden lg:flex items-center gap-6 font-extralight">
            {navLinks.map(({ label, href }) => (
              <li key={href} className="relative group">
                <Link
                  className="block text-gray-700 hover:text-black"
                  href={href}
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                    {label}
                  </span>
                </Link>
              </li>
            ))}

            {!isLogin ? (
              <li className="relative group">
                <Link
                  className="block text-gray-700 hover:text-black"
                  href="/login-register"
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                    Login / Register
                  </span>
                </Link>
              </li>
            ) : (
              <li className="relative group">
                <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black">
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                    Account
                  </span>{" "}
                  <FaAngleDown />
                </div>
                <div className="absolute left-0 top-full bg-white border border-black shadow-lg flex-col gap-3 text-left p-5 w-40 z-10 hidden group-hover:flex transition-all duration-200 ease-in-out">
                  {userPanelLinks.map(({ label, href }) => (
                    <Link key={href} href={href} className="hover:underline">
                      {label}
                    </Link>
                  ))}
                </div>
              </li>
            )}

            {isAdmin && (
              <li className="relative group">
                <Link
                  className="block text-gray-700 hover:text-black"
                  href="/adminPanel"
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                    Admin Panel
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-4">
            <NavbarCartBtn />
            <Link
              href={user ? "/userPanel/wishlist" : "/login-register"}
              className="relative"
            >
              <IoMdHeartEmpty className="text-2xl text-gray-700 hover:text-black" />
              <span className="absolute -top-2 -left-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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

        {menuOpen && (
          <NavbarMobile
            navLinks={navLinks}
            userPanelLinks={userPanelLinks}
            closeMenu={closeMenu}
            isLogin={isLogin}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </nav>
  );
}
