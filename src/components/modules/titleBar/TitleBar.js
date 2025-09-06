import React from "react";
import { FaAngleRight } from "react-icons/fa";

function TitleBar({ title, subtitle, link }) {
  return (
    <div className="px-6 md:px-16 my-10">
      <div className="flex items-center justify-between">
        {/* Title and Subtitle */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Link with Icon */}
        <div>
          <a
            href={link}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <span className="text-sm font-medium">{link}</span>
            <FaAngleRight />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TitleBar;
