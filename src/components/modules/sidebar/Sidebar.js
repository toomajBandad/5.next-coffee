import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineTicket,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineCog,
} from "react-icons/hi";


const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: HiOutlineHome },
  { name: "Orders", href: "/orders", icon: HiOutlineShoppingCart },
  { name: "Tickets", href: "/tickets", icon: HiOutlineTicket },
  { name: "Comments", href: "/comments", icon: HiOutlineChat },
  { name: "Favorites", href: "/favorites", icon: HiOutlineHeart },
  { name: "Setting", href: "/setting", icon: HiOutlineCog },
];


export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col shadow-lg">
      <div className="px-6 py-6 text-2xl font-bold tracking-wide border-b border-gray-800">
        Admin Panel
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
      </nav>
      <div className="px-6 py-4 border-t border-gray-800 text-sm text-gray-500">
        &copy; 2025 Your Company
      </div>
    </aside>
  );
}