"use client";

import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ArticleCard from "@/components/modules/articleCard/ArticleCard";

function ArticleEdit({ articles }) {
  const router = useRouter();

  async function addArticle() {
    const result = await Swal.fire({
      title: "Add New Article",
      html:
        `<input id="swal-title" class="swal2-input" placeholder="Title">` +
        `<input id="swal-subtitle" class="swal2-input" placeholder="Subtitle">` +
        `<input id="swal-author" class="swal2-input" placeholder="Author">` +
        `<input id="swal-image" class="swal2-input" placeholder="Image URL">` +
        `<textarea id="swal-content" class="swal2-textarea" placeholder="Content"></textarea>` +
        `<input id="swal-tags" class="swal2-input" placeholder="Tags (comma-separated)">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: () => {
        const title = document.getElementById("swal-title")?.value.trim();
        const subtitle = document.getElementById("swal-subtitle")?.value.trim();
        const author = document.getElementById("swal-author")?.value.trim();
        const image = document.getElementById("swal-image")?.value.trim();
        const content = document.getElementById("swal-content")?.value.trim();
        const tagsRaw = document.getElementById("swal-tags")?.value.trim();

        if (!title || !author || !content) {
          Swal.showValidationMessage("Title, Author, and Content are required");
          return;
        }

        const tags = tagsRaw ? tagsRaw.split(",").map((tag) => tag.trim()) : [];
        return { title, subtitle, author, image, content, tags };
      },
    });

    if (result.isConfirmed) {
      const res = await fetch("/api/articles", {
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
          data.message || "Failed to create article.",
          "error"
        );
      }
    }
  }

  async function editArticle(e, article) {
    e.preventDefault();

    const result = await Swal.fire({
      title: `Edit "${article.title}"`,
      html:
        `<input id="swal-title" class="swal2-input" placeholder="Title" value="${article.title}">` +
        `<input id="swal-subtitle" class="swal2-input" placeholder="Subtitle" value="${
          article.subtitle || ""
        }">` +
        `<input id="swal-author" class="swal2-input" placeholder="Author" value="${article.author}">` +
        `<input id="swal-image" class="swal2-input" placeholder="Image URL" value="${
          article.image || ""
        }">` +
        `<textarea id="swal-content" class="swal2-textarea" placeholder="Content">${article.content}</textarea>` +
        `<input id="swal-tags" class="swal2-input" placeholder="Tags (comma-separated)" value="${
          article.tags?.join(", ") || ""
        }">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const title = document.getElementById("swal-title")?.value.trim();
        const subtitle = document.getElementById("swal-subtitle")?.value.trim();
        const author = document.getElementById("swal-author")?.value.trim();
        const image = document.getElementById("swal-image")?.value.trim();
        const content = document.getElementById("swal-content")?.value.trim();
        const tagsRaw = document.getElementById("swal-tags")?.value.trim();

        if (!title || !author || !content) {
          Swal.showValidationMessage("Title, Author, and Content are required");
          return;
        }

        const tags = tagsRaw ? tagsRaw.split(",").map((tag) => tag.trim()) : [];
        return { title, subtitle, author, image, content, tags };
      },
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/articles/${article._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });

      if (res.ok) {
        await Swal.fire("Saved!", "Article updated successfully.", "success");
        router.refresh();
      } else {
        await Swal.fire("Error", "Failed to update article.", "error");
      }
    }
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

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
}

export default ArticleEdit;
