'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

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
          method: 'DELETE',
        });

        if (res.ok) {
          await Swal.fire("Deleted!", "Comment removed successfully.", "success");
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to delete comment.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">💬 Manage Comments</h2>

      {comments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No comments available.</p>
          <p className="mt-2">User feedback will appear here once submitted.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className={`border rounded-lg p-4 shadow-sm ${
                comment.isAccept ? 'border-green-300' : 'border-red-300'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{comment.username}</p>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-800 mb-2">{comment.body}</p>

              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-bold">⭐ {comment.score}/5</span>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  onClick={() => removeComment(comment)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentEdit;