import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

function scrollToTop() {
  return (
    <button className="fixed bottom-8 right-8 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition z-50 border-1 border-white cursor-pointer">
      <FaAngleDoubleUp />
    </button>
  );
}

export default scrollToTop;
