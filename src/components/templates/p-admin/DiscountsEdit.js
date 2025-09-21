"use client";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function DiscountsEdit({ discounts }) {
  const router = useRouter();

  async function addDiscount() {
    try {
      const result = await Swal.fire({
        title: "Add New Discount",
        html:
          `<input id="swal-productID" class="swal2-input" placeholder="Product ID">` +
          `<input id="swal-code" class="swal2-input" placeholder="Discount Code">` +
          `<input id="swal-percent" class="swal2-input" placeholder="Percent (%)">` +
          `<input id="swal-maxUse" class="swal2-input" placeholder="Max Use">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Add",
        preConfirm: () => {
          const productID = document
            .getElementById("swal-productID")
            ?.value.trim();
          const code = document.getElementById("swal-code")?.value.trim();
          const percent = parseFloat(
            document.getElementById("swal-percent")?.value.trim()
          );
          const maxUse = parseInt(
            document.getElementById("swal-maxUse")?.value.trim()
          );

          if (!productID || !code || isNaN(percent) || isNaN(maxUse)) {
            Swal.showValidationMessage(
              "All fields must be filled with valid values"
            );
            return;
          }

          return { productID, code, percent, maxUse };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch("/api/discounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          await Swal.fire("Added!", data.message, "success");
          router.refresh();
        } else {
          await Swal.fire(
            "Error",
            data.message || "Failed to create discount.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error adding discount:", error);
    }
  }

  async function editDiscount(discount) {
    try {
      const result = await Swal.fire({
        title: `Edit ${discount.code}`,
        html:
          `<input id="swal-code" class="swal2-input" placeholder="Code" value="${discount.code}">` +
          `<input id="swal-percent" class="swal2-input" placeholder="Percent (%)" value="${discount.percent}">` +
          `<input id="swal-maxUse" class="swal2-input" placeholder="Max Use" value="${discount.maxUse}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const code = document.getElementById("swal-code")?.value.trim();
          const percent = parseFloat(
            document.getElementById("swal-percent")?.value.trim()
          );
          const maxUse = parseInt(
            document.getElementById("swal-maxUse")?.value.trim()
          );

          if (!code || isNaN(percent) || isNaN(maxUse)) {
            Swal.showValidationMessage(
              "All fields must be filled with valid values"
            );
            return;
          }

          return { code, percent, maxUse };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/discounts/${discount._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire(
            "Saved!",
            "Discount updated successfully.",
            "success"
          );
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
        title: `Remove ${discount.code}?`,
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
          await Swal.fire(
            "Removed!",
            "Discount deleted successfully.",
            "success"
          );
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
        title: `Deactivate ${discount.code}?`,
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
          await Swal.fire(
            "Deactivated!",
            "Discount has been deactivated.",
            "success"
          );
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

      <div className="mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={addDiscount}
        >
          ➕ Add Discount
        </button>
      </div>

      {discounts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No discounts available at the moment.</p>
          <p className="mt-2">
            Click "Add Discount" to create your first promotion.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Percent (%)</th>
                <th className="px-4 py-2 text-left">Max Use</th>
                <th className="px-4 py-2 text-left">used time</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{discount.code}</td>
                  <td className="px-4 py-2">{discount.percent}</td>
                  <td className="px-4 py-2">{discount.maxUse}</td>
                  <td className="px-4 py-2">{discount.useTimes}</td>
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
