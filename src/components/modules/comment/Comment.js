import React from "react";

function Comment({ comment }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4">
      {/* Header: Username & Date */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          {comment.username}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(comment.date).toLocaleDateString()}
        </div>
      </div>

      {/* Body */}
      <p className="text-gray-700 leading-relaxed">{comment.body}</p>

      {/* Footer: Email, Score, Product ID */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <span>{comment.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Score:</span>
          <span className="text-yellow-500 font-bold">{comment.score} ★</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;