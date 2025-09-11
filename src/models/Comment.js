import mongoose from "mongoose";
import Product from "./Product";

const commentSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  username: { type: String, required: true },
  body: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: () => Date.now(), immutable: false },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
