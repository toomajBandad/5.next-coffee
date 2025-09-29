import mongoose from "mongoose";
import "./User";
import "./Product";

const commentSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    body: { type: String, required: true },
    email: { type: String, required: true },
    score: { type: Number, required: true },
    isAccept: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
