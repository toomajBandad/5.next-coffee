import connectToDB from "@/configs/db";
import WishlistModel from "@/models/wishList";
import { authUser } from "@/utils/authUser";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    const { id } = await params;
    const productId = await id;
    console.log("productId", id);

    const userId = user._id;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }

    await WishlistModel.findOneAndDelete({
      productId: productId,
      userId: userId,
    });

    return NextResponse.json(
      { message: "Product removed from wishlist successfully!", success: true },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
