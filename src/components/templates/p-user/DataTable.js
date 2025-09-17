"use client";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CommentTable({ comments }) {
  async function showComment(body) {
    Swal.fire({
      title: body,
      icon: "info",
      confirmButtonText: "Close",
    });
  }

  async function editComment(id) {
    try {
      const updatedData = {
        score: 4.8, // Example update
        isAccept: true,
      };

      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update comment");
      const data = await res.json();
      console.log("Updated comment:", data);
      // Optionally refresh or update UI
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  }

  async function removeComment(id) {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete comment");
      console.log(`Comment ${id} deleted`);
      // Optionally refresh or remove from UI
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Comments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border border-gray-300 text-left">
                Comment ID
              </th>
              <th className="p-3 border border-gray-300 text-left">Date</th>
              <th className="p-3 border border-gray-300 text-left">Product</th>
              <th className="p-3 border border-gray-300 text-left">Rate</th>
              <th className="p-3 border border-gray-300 text-left">State</th>
              <th className="p-3 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments?.length > 0 ? (
              comments.map((comment, index) => (
                <tr key={comment._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{index + 1}</td>
                  <td className="p-3 border border-gray-300">
                    {new Date(comment.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {comment.productID?.name || "Unknown Product"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <span className="flex gap-1 items-center">
                      {comment.score}
                      <FaStar className="text-yellow-500" />
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300">
                    {comment.isAccept ? "Accepted" : "Rejected"}
                  </td>
                  <td className="p-3 border border-gray-300 space-x-2">
                    <button
                      className="px-3 py-1 text-sm border border-gray-400 rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => showComment(comment.body)}
                    >
                      Show
                    </button>
                    <button
                      className="px-3 py-1 text-sm border border-gray-400 rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => editComment(comment._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm border border-red-400 text-red-600 rounded hover:bg-red-100 cursor-pointer"
                      onClick={() => removeComment(comment._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No comments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
