"use client";
import React from "react";
import { FaUserCircle, FaClock, FaTag } from "react-icons/fa";

function Ticket({ ticket }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-md p-6 mb-6 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{ticket.title}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            ticket.isAnswered === "true"
              ? "bg-green-100 text-green-700"
              : ticket.isAnswered === "false"
              ? "bg-gray-200 text-gray-600"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {ticket.isAnswered === "true"
            ? "Answered"
            : ticket.isAnswered === "false"
            ? "Pending"
            : "In Progress"}
        </span>
      </div>

      {/* Body */}
      <p className="text-gray-700 mb-4">{ticket.body}</p>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-gray-500" />
          <span>{ticket.userID?.username}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="text-gray-500" />
          <span>{new Date(ticket.createdAt).toLocaleString()}</span>
        </div>
        <div>
          <strong>Priority:</strong> {ticket.priority}
        </div>
        <div>
          <strong>Department:</strong> {ticket.department?.title}
        </div>
        <div>
          <strong>Sub-Department:</strong> {ticket.subDepartment?.title}
        </div>
      </div>

      {/* Footer Tag */}
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
        <FaTag />
        <span>Ticket ID: {ticket._id}</span>
      </div>
    </div>
  );
}

export default Ticket;