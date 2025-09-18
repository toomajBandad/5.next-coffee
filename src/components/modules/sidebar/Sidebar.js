"use client";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineTicket,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineCog,
} from "react-icons/hi";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", href: "/userPanel", icon: HiOutlineHome },
    { name: "Orders", href: "/userPanel/orders", icon: HiOutlineShoppingCart },
    { name: "Tickets", href: "/userPanel/tickets", icon: HiOutlineTicket },
    { name: "Comments", href: "/userPanel/comments", icon: HiOutlineChat },
    { name: "Favorites", href: "/userPanel/wishlist", icon: HiOutlineHeart },
    { name: "Setting", href: "/userPanel/setting", icon: HiOutlineCog },
  ];

  async function logoutUser() {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/auth/signout", { method: "POST" });
        if (response.ok) {
          Swal.fire("Logged out!", "You have been logged out.", "success").then(
            () => {
              location.replace("/");
            }
          );
        }
      }
    });
  }
  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col shadow-lg">
      <div className="px-6 py-6 text-2xl font-bold tracking-wide border-b border-gray-800">
        User Panel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-all hover:cursor-pointer"
          onClick={logoutUser}
        >
          <MdLogout className="h-5 w-5" />
          <span>Logout</span>
        </div>
      </nav>
      <div className="px-6 py-4 border-t border-gray-800 text-sm text-gray-500">
        &copy; 2025 Your Company
      </div>
    </aside>
  );
}
