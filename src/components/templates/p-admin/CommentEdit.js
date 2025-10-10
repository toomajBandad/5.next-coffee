"use client";

import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function CommentEdit({ comments }) {
  const router = useRouter();

  async function removeComment(comment) {
    try {
      const result = await Swal.fire({
        title: `Delete comment from ${comment.username}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/comments/${comment._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire(
            "Deleted!",
            "Comment removed successfully.",
            "success"
          );
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to delete comment.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
  async function toggleIsAccept(comment) {
    console.log("Toggling comment approval...");

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: comment.isAccept
          ? "Reject this comment?"
          : "Approve this comment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: comment.isAccept ? "Reject" : "Approve",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/comments/${comment._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAccept: !comment.isAccept }),
        });

        if (res.ok) {
          await Swal.fire(
            "Updated!",
            `Comment ${
              !comment.isAccept ? "approved" : "rejected"
            } successfully.`,
            "success"
          );
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to update comment.", "error");
        }
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      await Swal.fire("Error", "Something went wrong.", "error");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">💬 Manage Comments</h2>

      {comments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No comments available.</p>
          <p className="mt-2">User feedback will appear here once submitted.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className={`border-3 rounded-lg p-4 shadow-sm ${
                comment.isAccept ? "border-green-300" : "border-red-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{comment.username}</p>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-800 mb-2">
                {comment.body.length > 40
                  ? comment.body.slice(0, 40) + "..."
                  : comment.body}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-bold">
                  ⭐ {comment.score}/5
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-red-600 text-white px-2 py-0.5 text-sm rounded hover:bg-red-500"
                    onClick={() => removeComment(comment)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-amber-500 text-white px-2 py-0.5 text-sm rounded hover:bg-amber-400"
                    onClick={() => toggleIsAccept(comment)}
                  >
                    {comment.isAccept ? "reject" : "aprove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default CommentEdit;
