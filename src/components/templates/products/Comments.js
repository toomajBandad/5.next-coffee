import React from "react";
import Comment from "@/components/modules/comment/Comment";
import CommentForm from "./CommentForm";

function Comments({ comments }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        User Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Comments */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={String(comment._id)} comment={comment} />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>

        {/* Right: Comment Form */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Leave a Comment
          </h3>
          <CommentForm />
        </div>
      </div>
    </section>
  );
}

export default Comments;