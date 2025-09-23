import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    shortDesc: { type: String, required: true },
    desc: { type: String, required: true },
    weight: { type: Number, required: true }, // in grams
    type: {
      type: String,
      enum: ["whole bean", "ground", "capsule", "instant"],
      required: true,
    },
    origin: { type: String, required: true }, // country or region
    roastLevel: {
      type: String,
      enum: ["light", "medium", "dark"],
      required: true,
    },
    smell: { type: String, required: true }, // e.g. "intense", "mild"
    score: { type: Number, default: 5 }, // average rating
    stock: { type: Number, default: 0 }, // available quantity
    tags: { type: [String], required: true }, // keywords
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    image: { type: String, required: true }, // product image URL
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
