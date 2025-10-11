"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function TicketEdit({ tickets }) {
  const router = useRouter();

  async function answerTicket(ticket) {
    try {
      const result = await Swal.fire({
        title: ` ${ticket.title}`,
        html: `
        <p> ${ticket.body}</p>
        <textarea id="swal-answer" class="swal2-textarea" placeholder="Answer">${
          ticket.answer || ""
        }</textarea>
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Answer",
        preConfirm: () => {
          const answer = document.getElementById("swal-answer").value.trim();
          if (!answer) {
            Swal.showValidationMessage("Answer cannot be empty");
            return false;
          }
          return { answer };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/tickets/${ticket._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "Ticket answered successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire(
            "Error",
            errorData.message || "Failed to answer ticket.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error answering ticket:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  async function removeTicket(ticket) {
    try {
      const result = await Swal.fire({
        title: `Remove this ticket?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/tickets/${ticket._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire(
            "Removed!",
            "Ticket deleted successfully.",
            "success"
          );
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire(
            "Error",
            errorData.message || "Failed to delete ticket.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error removing ticket:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">👥 Manage Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Priority</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className={`border-t border-gray-200 ${
                  ticket.isAnswered ? "bg-green-100" : ""
                }`}
              >
                <td className="px-2 py-2">{ticket.title}</td>
                <td className="px-2 py-2">{ticket.priority}</td>
                <td className="px-2 py-2 flex flex-col gap-0.5 sm:flex-row sm:gap-2 justify-center items-center">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => answerTicket(ticket)}
                  >
                    Answer
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
    </>
  );
}

export default TicketEdit;
