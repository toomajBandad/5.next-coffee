"use client";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CommentTable({ comments }) {
  async function showComment(body) {
    Swal.fire({
      title: "Comment Text : ",
      text:body,
      confirmButtonText: "Close",
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Your Comments</h1>
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
                    {new Date(comment.createdAt).toLocaleDateString()}
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
    </>
  );
}
