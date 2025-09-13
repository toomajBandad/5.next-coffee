import connectToDB from "@/configs/db";
import WishlistModel from "@/models/wishList";
import { NextResponse } from "next/server";
// import "@/models/Comment";

export async function GET() {
  try {
    await connectToDB();
    const wishlist = await WishlistModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "wishlist fetched successfully!",
        data: wishlist,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch wishlist",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const { userId, productId } = await req.json();

    const newWishlist = await WishlistModel.create({ userId, productId });

    return NextResponse.json(
      {
        message: "Product add to wishlist successfully!",
        data: newWishlist,
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
