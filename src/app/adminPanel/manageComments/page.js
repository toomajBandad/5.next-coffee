import CommentEdit from "@/components/templates/p-admin/CommentEdit";
import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import React from "react";

async function ManageComments() {
  await connectToDB();
  const comments = await commentModel.find({}).lean();
  return (
    <div>
      <CommentEdit comments={JSON.parse(JSON.stringify(comments))} />
    </div>
  );
}

export default ManageComments;
