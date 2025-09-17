import React from "react";

function Box({ icon, title, number }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
}

export default Box;
