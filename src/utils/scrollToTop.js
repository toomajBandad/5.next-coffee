"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTopHandler}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-8 right-8 sm:bottom-4 sm:right-4 bg-black text-white p-3 rounded-full 
        hover:bg-gray-800 hover:scale-110 transform transition-all duration-300 
        z-50 border border-white cursor-pointer outline-none 
        ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <FaAngleDoubleUp className="w-5 h-5" />
    </button>
  );
}

export default ScrollToTop;