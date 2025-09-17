"use client"
import React from 'react'
import { FaUserCircle, FaClock, FaTag } from "react-icons/fa";

function Ticket({ title, user, time, status }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition">
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
          <FaUserCircle />
          <span>{user}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
          <FaClock />
          <span>{time}</span>
        </div>
      </div>
      <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-sm">
        <FaTag />
        <span className={`px-2 py-1 rounded-full ${
          status === "Open" ? "bg-green-100 text-green-700" :
          status === "Closed" ? "bg-gray-200 text-gray-600" :
          "bg-yellow-100 text-yellow-700"
        }`}>
          {status}
        </span>
      </div>
    </div>
  );

}

export default Ticket