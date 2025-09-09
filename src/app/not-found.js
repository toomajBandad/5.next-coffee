import React from "react";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="text-6xl font-extrabold sm:text-7xl md:text-8xl">404</h1>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl">Page Not Found</p>
      <p className="mt-2 max-w-md text-sm text-gray-400 sm:text-base">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded border border-white px-6 py-2 text-sm font-medium transition duration-300 hover:bg-white hover:text-black"
      >
        Return Home
      </a>
    </div>
  );
}

export default NotFound;
