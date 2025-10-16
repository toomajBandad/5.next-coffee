"use client";
import React from "react";
import Swal from "sweetalert2";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useRouter } from "next/navigation";

function OrderEdit({ orders }) {
  const router = useRouter();

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  async function showOrder(order) {
    const itemList = order.items
      .map(
        (item) =>
          `<div>
            ${item.productId?.name ?? "Unknown product"} × ${item.quantity}
            <span> (€${item.productId?.price?.toFixed(2) ?? "—"})</span>
          </div>`
      )
      .join("");

    Swal.fire({
      title: `Order Details`,
      html: `
        <p><strong>Items:</strong></p>
        ${itemList}
      `,
      confirmButtonText: "Close",
    });
  }

  async function removeOrder(order) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete order ${order._id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/order/${order._id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");

        Swal.fire("Deleted!", "The order has been removed.", "success");
        router.refresh();
      } catch (error) {
        Swal.fire("Error", "Could not delete the order.", "error");
      }
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaEnvelopeOpenText className="text-gray-700 text-3xl" />
        Manage Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">User</th>
              <th className="px-2 py-2">Total (€)</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Created</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t border-gray-200">
                  <td className="px-2 py-2">
                    {order.userId?.username ?? "—"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {order.userId?.email}
                    </span>
                  </td>
                  <td className="px-2 py-2">€{order.total?.toFixed(2)}</td>
                  <td className="px-2 py-2">{order.status}</td>
                  <td className="px-2 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-2 py-2 flex flex-col gap-1 sm:flex-row sm:gap-2 justify-center items-center">
                    <button
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                      onClick={() => showOrder(order)}
                      aria-label={`View order ${order._id}`}
                    >
                      Detail
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition-colors"
                      onClick={() => removeOrder(order)}
                      aria-label={`Delete order ${order._id}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-2 py-4 text-gray-500">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderEdit;
