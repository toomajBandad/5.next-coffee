"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function ProductEdit({ products }) {
  const router = useRouter();

  // ✅ Add New Product
  async function addProduct() {
    try {
      const result = await Swal.fire({
        title: "Add New Product",
        html: `
          <input id="swal-name" class="swal2-input" placeholder="Name">
          <input id="swal-price" class="swal2-input" placeholder="Price" type="number">
          <input id="swal-shortDesc" class="swal2-input" placeholder="Short Description">
          <input id="swal-desc" class="swal2-input" placeholder="Description">
          <input id="swal-weight" class="swal2-input" placeholder="Weight" type="number">
          <input id="swal-suitable" class="swal2-input" placeholder="Suitable For">
          <input id="swal-smell" class="swal2-input" placeholder="Smell">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Create",
        preConfirm: () => {
          const name = document.getElementById("swal-name").value.trim();
          const price = parseFloat(document.getElementById("swal-price").value);
          const shortDesc = document.getElementById("swal-shortDesc").value.trim();
          const desc = document.getElementById("swal-desc").value.trim();
          const weight = parseFloat(document.getElementById("swal-weight").value);
          const suitable = document.getElementById("swal-suitable").value.trim();
          const smell = document.getElementById("swal-smell").value.trim();

          if (!name || isNaN(price) || !shortDesc || !desc || isNaN(weight) || !suitable || !smell) {
            Swal.showValidationMessage("All fields are required and must be valid");
            return false;
          }

          return { name, price, shortDesc, desc, weight, suitable, smell };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Created!", "Product added successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire("Error", errorData.message || "Failed to create product.", "error");
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  // ✅ Edit Existing Product
  async function editProduct(product) {
    try {
      const result = await Swal.fire({
        title: `Edit ${product.name}`,
        html: `
          <input id="swal-name" class="swal2-input" placeholder="Name" value="${product.name}">
          <input id="swal-price" class="swal2-input" placeholder="Price" type="number" value="${product.price}">
          <input id="swal-shortDesc" class="swal2-input" placeholder="Short Description" value="${product.shortDesc}">
          <input id="swal-desc" class="swal2-input" placeholder="Description" value="${product.desc}">
          <input id="swal-weight" class="swal2-input" placeholder="Weight" type="number" value="${product.weight}">
          <input id="swal-suitable" class="swal2-input" placeholder="Suitable For" value="${product.suitable}">
          <input id="swal-smell" class="swal2-input" placeholder="Smell" value="${product.smell}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          const name = document.getElementById("swal-name").value.trim();
          const price = parseFloat(document.getElementById("swal-price").value);
          const shortDesc = document.getElementById("swal-shortDesc").value.trim();
          const desc = document.getElementById("swal-desc").value.trim();
          const weight = parseFloat(document.getElementById("swal-weight").value);
          const suitable = document.getElementById("swal-suitable").value.trim();
          const smell = document.getElementById("swal-smell").value.trim();

          if (!name || isNaN(price) || !shortDesc || !desc || isNaN(weight) || !suitable || !smell) {
            Swal.showValidationMessage("All fields are required and must be valid");
            return false;
          }

          return { name, price, shortDesc, desc, weight, suitable, smell };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/products/${product._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "Product updated successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire("Error", errorData.message || "Failed to update product.", "error");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  // ✅ Remove Product
  async function removeProduct(product) {
    try {
      const result = await Swal.fire({
        title: `Remove ${product.name}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/products/${product._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire("Removed!", "Product deleted successfully.", "success");
          router.refresh();
        } else {
          const errorData = await res.json();
          await Swal.fire("Error", errorData.message || "Failed to delete product.", "error");
        }
      }
    } catch (error) {
      console.error("Error removing product:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">🛍️ Manage Products</h2>

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        onClick={addProduct}
      >
        ➕ Add Product
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Short Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">€{product.price}</td>
                <td className="px-4 py-2">{product.shortDesc}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => removeProduct(product)}
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

export default ProductEdit;