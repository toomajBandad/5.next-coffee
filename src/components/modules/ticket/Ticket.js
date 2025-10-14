"use client";

import React from "react";
import { FaClock, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";
import BtnBlack from "../btnBlack/BtnBlack";

function Ticket({ ticket }) {
  function showAnswer() {
    Swal.fire({
      title: "Admin answer:",
      text: ticket.answer,
    });
  }

  return (
    <div
      className={`bg-white border rounded-lg shadow-sm p-4 mb-4 transition hover:shadow-md ${
        ticket.isAnswered ? "border-green-200" : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-semibold text-gray-800">
          {ticket.title}
        </h2>
        <span
          className={`text-[10px] font-medium px-2 py-[2px] rounded-full transition ${
            ticket.isAnswered
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          {ticket.isAnswered ? "Answered" : "In Progress"}
        </span>
      </div>

      {/* Body */}
      <p className="text-sm text-gray-700 mb-3">{ticket.body}</p>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <FaClock className="text-gray-500 text-[11px]" />
          <span>
            {new Date(ticket.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div>
          <strong>Departments:</strong> {ticket.department?.title} /{" "}
          {ticket.subDepartment?.title}
        </div>

        {ticket.priority && (
          <div>
            <strong>Priority:</strong> {ticket.priority}
          </div>
        )}
        <div className="flex justify-end mt-2">
          {ticket.isAnswered && (
            <BtnBlack
              text="See answer"
              onClick={showAnswer}
              title="View admin response"
            />
          )}
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}

export default Ticket;
