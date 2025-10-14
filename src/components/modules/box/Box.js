import React from "react";

function Box({ icon, title, number }) {
  return (
    <div className="bg-white shadow-md rounded-lg px-2 py-4 flex flex-col items-center hover:shadow-lg transition">
      <div className="text-gray-700 text-2xl">{icon}</div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-xl font-bold">{number}</p>
    </div>
  );
}

export default Box;
