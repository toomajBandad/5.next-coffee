import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
