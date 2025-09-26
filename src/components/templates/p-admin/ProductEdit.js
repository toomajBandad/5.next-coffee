"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductFormModal from "./ProductFormModal";
import Swal from "sweetalert2";

function ProductEdit({ products }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `/api/products/${editingProduct._id}`
      : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to save product.");
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Something went wrong.");
    }
  };

  const handleRemove = async (product) => {
  const result = await Swal.fire({
    title: `Remove ${product.name}?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      await Swal.fire({
        title: "Deleted!",
        text: `${product.name} has been removed.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      router.refresh();
    } else {
      const error = await res.json();
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to delete product.",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Error deleting product:", err);
    Swal.fire({
      title: "Error",
      text: "Something went wrong.",
      icon: "error",
    });
  }
};


  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">🛍️ Manage Products</h2>

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        onClick={handleAdd}
      >
        ➕ Add Product
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Short Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">€{product.price}</td>
                <td className="px-4 py-2">{product.shortDesc}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => handleRemove(product)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </div>
  );
}

export default ProductEdit;