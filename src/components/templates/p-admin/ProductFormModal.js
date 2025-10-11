"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

const typeOptions = ["whole bean", "ground", "capsule", "instant"];
const roastOptions = ["light", "medium", "dark"];

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData = {} }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      shortDesc: "",
      desc: "",
      weight: "",
      type: "",
      origin: "",
      roastLevel: "",
      smell: "",
      image: "",
      tags: "",
      stock: "",
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const tagsAsString = initialData.tags?.join(", ") || "";
      reset({ ...initialData, tags: tagsAsString });
    }
  }, [initialData, reset]);

  const submitHandler = (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      weight: parseFloat(data.weight),
      stock: parseInt(data.stock, 10),
      tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      score: initialData?.score ?? 5,
    };
    onSubmit(formattedData);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl p-8">
        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          {initialData && initialData._id ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["name", "Name"],
            ["brand", "Brand"],
            ["price", "Price", "number"],
            ["shortDesc", "Short Description"],
            ["desc", "Full Description"],
            ["weight", "Weight (g)", "number"],
            ["origin", "Origin"],
            ["smell", "Smell"],
            ["image", "Image URL"],
            ["stock", "Stock", "number"],
          ].map(([key, label, type = "text"]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                {...register(key, { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              {errors[key] && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              {...register("type", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            >
              <option value="">Select type</option>
              {typeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">Type is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Roast Level</label>
            <select
              {...register("roastLevel", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            >
              <option value="">Select roast level</option>
              {roastOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.roastLevel && (
              <span className="text-red-500 text-sm">Roast level is required</span>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              {...register("tags", { required: true })}
              placeholder="e.g. fruity, bold, organic"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.tags && (
              <span className="text-red-500 text-sm">Tags are required</span>
            )}
          </div>

          <div className="md:col-span-2 mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-blue-500"
            >
              {initialData && initialData._id ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}