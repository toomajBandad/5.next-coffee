import Image from "next/image";
import React from "react";

function FotoTextBox({ reverse, title, text, btn }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gray-800 text-white shadow-lg">
      <div
        className={`flex flex-col md:flex-row items-center gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-72 md:h-96 rounded-lg overflow-hidden border border-gray-700 shadow-md">
          <Image
            src="/images/cards/2.jpg"
            alt="Monochrome visual"
            fill
            className="object-cover grayscale"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <h2 className="text-3xl font-bold text-white underline">{title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{text}</p>
          <button className="self-start px-6 py-3 bg-white text-gray-800 border-1 cursor-pointer font-semibold rounded transition duration-300 hover:bg-gray-800 hover:text-white">
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FotoTextBox;