import Comment from "@/components/modules/comment/Comment";
import React from "react";
import CommentForm from "./CommentForm";

function Comments({ comments }) {
  return (
    <div>
      <div>Comments are here</div>
      <div className="flex gap-3">
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={String(comment._id)} comment={comment} />
          ))}
      </div>
      <CommentForm />
    </div>
  );
}

export default Comments;
