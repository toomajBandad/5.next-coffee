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
    setValue,
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
      tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      score: initialData?.score ?? 5,
      stock: initialData?.stock ?? 0,
    };
    onSubmit(formattedData);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
        <h2 className="text-xl font-semibold mb-6">
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
          ].map(([key, label, type = "text"]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                {...register(key, { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors[key] && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
          ))}

          {/* Dropdown for Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              {...register("type", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          {/* Dropdown for Roast Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Roast Level</label>
            <select
              {...register("roastLevel", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          {/* Tags input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              {...register("tags", { required: true })}
              placeholder="e.g. fruity, bold, organic"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.tags && (
              <span className="text-red-500 text-sm">Tags are required</span>
            )}
          </div>

          {/* Buttons */}
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              {initialData && initialData._id ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}