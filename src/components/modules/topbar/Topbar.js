import React from "react";
import Image from "next/image";
import Link from "next/link";
import userImg from "@images/cards/4.jpg";

function Topbar({ username }) {
  return (
    <nav className="w-full bg-white text-black sticky top-0 z-2 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Search Input */}
          <div className="flex-1 mx-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <Image
              src={userImg}
              alt="User Photo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
