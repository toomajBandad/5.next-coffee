import Image from "next/image";
import React from "react";

function FotoTextBox({ reverse, title, text, btn, image }) {
  return (
    <section className="w-full bg-gray-900 text-white py-20 px-6 md:px-12">
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-72 md:h-[28rem] rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <Image
            src={image}
            alt="Coffee lifestyle visual"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale transition duration-500 ease-in-out hover:grayscale-0"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed my-10">{text}</p>
          <button className="inline-block px-6 py-3 bg-white text-gray-900 font-semibold rounded-md shadow border border-transparent hover:border-white hover:cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300">
            {btn}
          </button>
        </div>
      </div>
    </section>
  );
}

export default FotoTextBox;
