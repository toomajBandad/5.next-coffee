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
  HiUserGroup 
} from "react-icons/hi";
import { RiDiscountPercentFill } from "react-icons/ri";

export default function Sidebar({ isAdmin }) {
  const navItems = [
    { name: "Dashboard", href: "/userPanel", icon: HiOutlineHome },
    { name: "Orders", href: "/userPanel/orders", icon: HiOutlineShoppingCart },
    { name: "Tickets", href: "/userPanel/tickets", icon: HiOutlineTicket },
    { name: "Comments", href: "/userPanel/comments", icon: HiOutlineChat },
    { name: "Favorites", href: "/userPanel/wishlist", icon: HiOutlineHeart },
    { name: "Setting", href: "/userPanel/setting", icon: HiOutlineCog },
  ];

  const adminItems = [
    { name: "Dashboard", href: "/adminPanel", icon: HiOutlineHome },
    { name: "Manage Orders", href: "/adminPanel/manageOrders", icon: HiOutlineShoppingCart },
    { name: "Manage Tickets", href: "/adminPanel/manageTickets", icon: HiOutlineTicket },
    { name: "Manage Comments", href: "/adminPanel/manageComments", icon: HiOutlineChat },
    { name: "Manage Users", href: "/adminPanel/manageUsers", icon: HiUserGroup },
    { name: "Manage Discounts", href: "/adminPanel/manageDiscounts", icon: RiDiscountPercentFill },
    { name: "Setting", href: "/adminPanel/setting", icon: HiOutlineCog },
  ];

  async function logoutUser() {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      const response = await fetch("/api/auth/signout", { method: "POST" });
      if (response.ok) {
        await Swal.fire("Logged out!", "You have been logged out.", "success");
        location.replace("/");
      }
    }
  }

  const itemsToRender = isAdmin ? adminItems : navItems;

  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col shadow-lg">
      <div className="px-6 py-6 text-2xl font-bold tracking-wide border-b border-gray-800">
        {isAdmin ? "Admin Panel" : "User Panel"}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {itemsToRender.map((item) => {
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