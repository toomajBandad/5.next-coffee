"use client";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function DiscountsEdit({ discounts }) {
  const router = useRouter();

  async function editDiscount(discount) {
    try {
      const result = await Swal.fire({
        title: `Edit ${discount.name}`,
        html:
          `<input id="swal-name" class="swal2-input" placeholder="Name" value="${discount.name}">` +
          `<input id="swal-rate" class="swal2-input" placeholder="Rate (%)" value="${discount.rate}">` +
          `<input id="swal-code" class="swal2-input" placeholder="Code" value="${discount.code}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const name = document.getElementById("swal-name")?.value.trim();
          const rate = parseFloat(document.getElementById("swal-rate")?.value.trim());
          const code = document.getElementById("swal-code")?.value.trim();
          if (!name || isNaN(rate)) {
            Swal.showValidationMessage("Name and valid rate are required");
            return;
          }
          return { name, rate, code };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/discounts/${discount._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "Discount updated successfully.", "success");
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to update discount.", "error");
        }
      }
    } catch (error) {
      console.error("Error editing discount:", error);
    }
  }

  async function removeDiscount(discount) {
    try {
      const result = await Swal.fire({
        title: `Remove ${discount.name}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/discounts/${discount._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire("Removed!", "Discount deleted successfully.", "success");
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to delete discount.", "error");
        }
      }
    } catch (error) {
      console.error("Error removing discount:", error);
    }
  }

  async function deactivateDiscount(discount) {
    try {
      const result = await Swal.fire({
        title: `Deactivate ${discount.name}?`,
        text: "Discount will no longer be active.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Deactivate",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/discounts/${discount._id}/deactivate`, {
          method: "POST",
        });

        if (res.ok) {
          await Swal.fire("Deactivated!", "Discount has been deactivated.", "success");
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to deactivate discount.", "error");
        }
      }
    } catch (error) {
      console.error("Error deactivating discount:", error);
    }
  }

return (
  <div className="bg-white text-black p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-semibold mb-6">🏷️ Manage Discounts</h2>
    {discounts.length === 0 ? (
      <div className="text-center text-gray-500 py-10">
        <p>No discounts available at the moment.</p>
        <p className="mt-2">You can add new discounts to start offering promotions.</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Rate (%)</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{discount.name}</td>
                <td className="px-4 py-2">{discount.rate}</td>
                <td className="px-4 py-2">{discount.code}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => editDiscount(discount)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => removeDiscount(discount)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                    onClick={() => deactivateDiscount(discount)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default DiscountsEdit;