import React from "react";
import {
  FaCoffee,
  FaInternetExplorer,
  FaSearchLocation,
  FaPhone,
  FaMailBulk,
  FaTelegram,
} from "react-icons/fa";

function Information() {
  const infoItems = [
    { icon: <FaCoffee />, label: "Next Coffee" },
    { icon: <FaInternetExplorer />, label: "next-coffee.com" },
    { icon: <FaSearchLocation />, label: "123 Brew Street, Bean City" },
    { icon: <FaPhone />, label: "+34 600 123 456" },
    { icon: <FaMailBulk />, label: "hello@next-coffee.com" },
    { icon: <FaTelegram />, label: "@nextcoffee" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
      <h3 className="text-4xl font-extrabold text-black mb-10 text-center">
        Contact Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-6">
            <div className="text-5xl text-gray-800">{item.icon}</div>
            <span className="text-xl text-gray-900 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Information;