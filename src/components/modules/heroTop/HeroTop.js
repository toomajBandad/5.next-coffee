import Link from "next/link";
import React from "react";

function HeroTop({ route, bg }) {
  return (
    <header
      className="relative mb-5 h-[300px] md:h-[400px] lg:h-[500px] bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 max-w-screen-xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide mb-4 drop-shadow-lg">
          {route}
        </h1>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-white text-base md:text-lg font-medium">
            <li>
              <Link href="/" className="hover:underline opacity-80">
                Home
              </Link>
            </li>
            <li>/</li>
            <li aria-current="page">
              <Link href={`/${route}`} className="hover:underline capitalize opacity-100">
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