import Link from "next/link";
import React from "react";

function HeroTop({ route, bg }) {
  return (
    <header
      className="relative mb-20 h-[400px] lg:h-[500px] bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 max-w-screen-xl mx-auto">
        <h1 className="text-white text-4xl lg:text-5xl font-extrabold uppercase mb-4">
          {route}
        </h1>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-white text-lg">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li aria-current="page">
              <Link href={`/${route}`} className="hover:underline capitalize">
                {route}
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}

export default HeroTop;