import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import CommentModel from "@/models/Comment";

export async function sincAllScoresOfProduct(productId) {
  await connectToDB();

  const acceptedComments = await CommentModel.find({
    productID: productId,
    isAccept: true,
  });

  const total = acceptedComments.reduce((sum, c) => sum + c.score, 0);
  const average = acceptedComments.length ? total / acceptedComments.length : 0;

  await ProductModel.findByIdAndUpdate(productId, { score: average });

  console.log("✅ product score synced.");
}
