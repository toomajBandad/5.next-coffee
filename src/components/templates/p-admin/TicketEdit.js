"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function TicketEdit({ tickets }) {
  const router = useRouter();

  async function editTicket(ticket) {
    try {
      const result = await Swal.fire({
        title: `Edit ${ticket.username}`,
        html: `
          <input id="swal-username" class="swal2-input" placeholder="Username" value="${ticket.username}">
          <input id="swal-email" class="swal2-input" placeholder="Email" value="${ticket.email}">
          <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${ticket.phone}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const username = document.getElementById("swal-username").value.trim();
          const email = document.getElementById("swal-email").value.trim();
          const phone = document.getElementById("swal-phone").value.trim();

          if (!username || !email || !phone) {
            Swal.showValidationMessage("All fields are required");
            return false;
          }

          return { username, email, phone };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/ticket/editTickets/${ticket._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "Ticket updated successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire("Error", errorData.message || "Failed to update ticket.", "error");
        }
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  async function removeTicket(ticket) {
    try {
      const result = await Swal.fire({
        title: `Remove ${ticket.username}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/ticket/editTickets/${ticket._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire("Removed!", "Ticket deleted successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire("Error", errorData.message || "Failed to delete ticket.", "error");
        }
      }
    } catch (error) {
      console.error("Error removing ticket:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">👥 Manage Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Text</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{ticket.title}</td>
                <td className="px-4 py-2">{ticket.body}</td>
                <td className="px-4 py-2">{ticket.priority}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => editTicket(ticket)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => removeTicket(ticket)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketEdit;