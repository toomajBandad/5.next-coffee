import Comment from "@/components/modules/comment/Comment";
import React from "react";
import CommentForm from "./CommentForm";

function Comments() {
  return (
    <div>
      <div>Comments are here</div>
      <div className="flex gap-3">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <CommentForm />
    </div>
  );
}

export default Comments;
