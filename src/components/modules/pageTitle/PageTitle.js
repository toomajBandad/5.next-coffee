"use client";
import React from "react";

function PageTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600 text-base sm:text-lg">{subtitle}</p>
    </div>
  );
}

export default PageTitle;
