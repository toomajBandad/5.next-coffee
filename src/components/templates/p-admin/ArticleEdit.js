"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ArticleCard from "@/components/modules/articleCard/ArticleCard";
import ArticleEditForm from "./ArticleEditForm";

function ArticleEdit({ articles }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  function addArticle() {
    setSelectedArticle(null); // no initial data
    setIsAdding(true);
    setShowEditForm(true);
  }

  async function editArticle(e, article) {
    e.preventDefault();
    setSelectedArticle(article);
    setShowEditForm(true);
  }

  async function deleteArticle(e, article) {
    e.preventDefault();
    const result = await Swal.fire({
      title: `Delete "${article.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/articles/${article._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await Swal.fire("Deleted!", "Article removed successfully.", "success");
        router.refresh();
      } else {
        await Swal.fire("Error", "Failed to delete article.", "error");
      }
    }
  }

  async function onSubmit(data) {
    const url = selectedArticle
      ? `/api/articles/${selectedArticle._id}`
      : "/api/articles";

    const method = selectedArticle ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok && result.success !== false) {
      setSelectedArticle(null);
      setShowEditForm(false);
      setIsAdding(false);
      router.refresh();
    } else {
      alert(result.message || "Failed to save article.");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">📝 Manage Articles</h2>

      <div className="mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={addArticle}
        >
          ➕ Add Article
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No articles available.</p>
          <p className="mt-2">
            Click "Add Article" to publish your first post.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              onEdit={editArticle}
              onDelete={deleteArticle}
            />
          ))}
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
            <ArticleEditForm
              selectedArticle={selectedArticle}
              onSubmit={onSubmit}
              onCancel={() => {
                setShowEditForm(false);
                setSelectedArticle(null);
                setIsAdding(false);
              }}
            />
        </div>
      )}
    </>
  );
}

export default ArticleEdit;
