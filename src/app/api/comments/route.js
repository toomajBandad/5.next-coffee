import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import { authUser } from "@/utils/authUser";

// GET: Fetch all comments with populated product info
export async function GET() {
  try {
    await connectToDB();

    const comments = await CommentModel.find({}, "-__v")
      .populate("productID", "title score") // limit populated fields
      .lean();

    return NextResponse.json(
      {
        message: "Comments fetched successfully!",
        data: comments,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch comments",
        success: false,
      },
      { status: 500 }
    );
  }
}

// POST: Create a new comment
export async function POST(req) {
  try {
    await connectToDB();
    const { productID, username, body, email, score } = await req.json();
    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        { message: "You must login first!", success: false },
        { status: 401 }
      );
    }

    if (
      !productID ||
      !username ||
      !body ||
      !email ||
      typeof score !== "number"
    ) {
      return NextResponse.json(
        { message: "Missing or invalid fields", success: false },
        { status: 400 }
      );
    }

    const newComment = await CommentModel.create({
      userID: user._id,
      productID,
      username,
      body,
      email,
      score,
      isApproved: false, // default to unapproved
    });

    await ProductModel.findByIdAndUpdate(productID, {
      $push: { comments: newComment._id },
    });

    return NextResponse.json(
      {
        message: "Comment submitted and awaiting approval.",
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