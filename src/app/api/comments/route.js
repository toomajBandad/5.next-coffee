import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import "@/models/Product";

export async function GET() {
  try {
    await connectToDB();
    const comments = await CommentModel.find({}, "-__v").populate("productID");

    return NextResponse.json(
      {
        message: "comments fetched successfully!",
        data: comments,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch products",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { productID, username, body, email, score } = await req.json();

    const newComment = await CommentModel.create({
      productID,
      username,
      body,
      email,
      score,
    });
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productID },
      { $push: { comments: newComment._id } }
    );

    return NextResponse.json(
      {
        message: "Comment created successfully!",
        data: newComment,
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
