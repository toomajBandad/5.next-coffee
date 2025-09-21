import mongoose from "mongoose";
import "./Product";

const discountSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    code: { type: String, required: true },
    percent: { type: Number, required: true },
    maxUse: { type: Number, required: true },
    useTimes: { type: Number, required: true },
  },
  { timestamps: true }
);

const Discount =
  mongoose.models.Discount || mongoose.model("Discount", discountSchema);

export default Discount;
