import mongoose from "mongoose";
import "./User";
import "./Product";

const wishListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const WishList =
  mongoose.models.WishList || mongoose.model("WishList", wishListSchema);

export default WishList;
