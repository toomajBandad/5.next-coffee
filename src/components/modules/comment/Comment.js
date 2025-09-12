import React from "react";

function Comment({ comment }) {
  return (
    <div>
      <div>{comment.productID}</div>
      <div>{comment.username}</div>
      <div>{comment.body}</div>
      <div>{comment.email}</div>
      <div>{comment.score}</div>
      <div>{comment.date}</div>
    </div>
  );
}

export default Comment;
