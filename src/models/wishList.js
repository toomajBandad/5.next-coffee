import mongoose from "mongoose";
import "./User";
import "./Product";

const wishListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    productId: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
  },
  {
    timestamps: true,
  }
);

const WishList =
  mongoose.models.Comment || mongoose.model("WishList", wishListSchema);

export default WishList;
