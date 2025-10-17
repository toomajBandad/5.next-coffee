"use client";

import FotoUploaderConfirmable from "@/components/modules/fotoUploader/FotoUploader";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ArticleEditForm({
  selectedArticle,
  onSubmit,
  onCancel,
}) {
  const [imageUrl, setImageUrl] = useState(selectedArticle?.image || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedArticle?.title || "",
      subtitle: selectedArticle?.subtitle || "",
      author: selectedArticle?.author || "",
      content: selectedArticle?.content || "",
      tags: selectedArticle?.tags?.join(", ") || "",
    },
  });

  const submitHandler = (data) => {
    const tags = data.tags ? data.tags.split(",").map((t) => t.trim()) : [];
    onSubmit({ ...data, tags, image: imageUrl });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl"
    >
      <h3 className="text-2xl font-semibold text-gray-800">
        {selectedArticle ? "✏️ Edit Article" : "Add Article"}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            {...register("title", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder="Article title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            {...register("subtitle")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder="Optional subtitle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author *
          </label>
          <input
            {...register("author", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder="Author name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">Author is required</p>
          )}
        </div>

        <div>
          <FotoUploaderConfirmable
            onUpload={(url) => setImageUrl(url)}
            currentUrl={selectedArticle?.image || null}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content *
          </label>
          <textarea
            {...register("content", { required: true })}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder="Write your article content here..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">Content is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            {...register("tags")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder="e.g. coffee, brewing, espresso"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          {selectedArticle ? "Save Changes" : "Create Article"}
        </button>
      </div>
    </form>
  );
}
