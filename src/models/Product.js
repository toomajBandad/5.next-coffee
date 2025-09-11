import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    shortDesc: { type: String, required: true },
    desc: { type: String, required: true },
    weight: { type: Number, required: true },
    suitable: { type: String, required: true },
    smell: { type: String, required: true },
    score: { type: Number, default: 5 },
    tags: { type: [String], required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;