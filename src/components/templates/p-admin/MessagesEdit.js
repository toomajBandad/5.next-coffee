"use client";
import React from "react";
import Swal from "sweetalert2";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useRouter } from "next/navigation";

function MessagesEdit({ messages, refreshMessages }) {
  const router = useRouter();

  async function showMessage(message) {
    Swal.fire({
      title: `Message from ${message.name}`,
      html: `
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Message:</strong></p>
        <p style="text-align:left; white-space:pre-wrap;">${
          message.body || "No content available."
        }</p>
      `,
      confirmButtonText: "Close",
    });
  }

  async function removeMessage(message) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the message from ${message.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/contact/${message._id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");

        Swal.fire("Deleted!", "The message has been removed.", "success");
        router.refresh();
        if (typeof refreshMessages === "function") {
          refreshMessages();
        }
      } catch (error) {
        Swal.fire("Error", "Could not delete the message.", "error");
      }
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaEnvelopeOpenText className="text-gray-700 text-3xl" />
        Manage Messages
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages?.length > 0 ? (
              messages.map((message) => (
                <tr key={message._id} className="border-t border-gray-200">
                  <td className="px-2 py-2">{message.name}</td>
                  <td className="px-2 py-2">{message.email}</td>
                  <td className="px-2 py-2 flex flex-col gap-1 sm:flex-row sm:gap-2 justify-center items-center">
                    <button
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                      onClick={() => showMessage(message)}
                      aria-label={`See message from ${message.name}`}
                    >
                      See
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition-colors"
                      onClick={() => removeMessage(message)}
                      aria-label={`Remove message from ${message.name}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-2 py-4 text-gray-500">
                  No messages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MessagesEdit;
