"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SidebarTop({ isAdmin }) {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState(pathname);

  const navItems = [
    { name: "Dashboard", href: "/userPanel" },
    { name: "Orders", href: "/userPanel/orders" },
    { name: "Tickets", href: "/userPanel/tickets" },
    { name: "Comments", href: "/userPanel/comments" },
    { name: "Favorites", href: "/userPanel/wishlist" },
    { name: "Setting", href: "/userPanel/setting" },
  ];

  const adminItems = [
    { name: "Dashboard", href: "/adminPanel" },
    { name: "Manage Orders", href: "/adminPanel/manageOrders" },
    { name: "Manage Products", href: "/adminPanel/manageProducts" },
    { name: "Manage Tickets", href: "/adminPanel/manageTickets" },
    { name: "Manage Comments", href: "/adminPanel/manageComments" },
    { name: "Manage Users", href: "/adminPanel/manageUsers" },
    { name: "Manage Discounts", href: "/adminPanel/manageDiscounts" },
    { name: "Manage Articles", href: "/adminPanel/manageArticles" },
    { name: "Setting", href: "/adminPanel/setting" },
  ];

  const itemsToRender = isAdmin ? adminItems : navItems;

  async function logoutUser() {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      const response = await fetch("/api/auth/signout", { method: "POST" });
      if (response.ok) {
        await Swal.fire("Logged out!", "You have been logged out.", "success");
        router.replace("/");
      }
    }
  }

  useEffect(() => {
    if (selected === "logout") {
      logoutUser();
    } else if (selected && selected !== pathname) {
      router.push(selected);
    }
  }, [selected]);

  return (
    <div className="z-5 bg-gray-50 px-4 py-4 lg:hidden">
      <label
        htmlFor="sidebar-top-select"
        className="block mb-2 text-sm text-gray-400"
      >
        Select Menu
      </label>
      <select
        id="sidebar-top-select"
        className="w-full border border-gray-400 focus:outline-black rounded-md px-3 py-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {itemsToRender.map((item) => (
          <option key={item.name} value={item.href}>
            {item.name}
          </option>
        ))}
        <option value="logout">Logout</option>
      </select>
    </div>
  );
}
