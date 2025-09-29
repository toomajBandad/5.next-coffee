import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { sincAllScoresOfProduct } from "@/utils/sincAllScoresOfProduct";

// DELETE: Delete a comment
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid comment ID", success: false },
        { status: 400 }
      );
    }
    const comment = await CommentModel.findByIdAndDelete(id);

    if (!comment) {
      return NextResponse.json(
        {
          message: "Comment not found!",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Comment deleted successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to delete commentssss",
        success: false,
      },
      { status: 500 }
    );
  }
}

// PUT: update a comment
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    const { isAccept } = await req.json();

    if (typeof isAccept !== "boolean") {
      return NextResponse.json(
        { message: "Missing or invalid 'isAccept' field", success: false },
        { status: 400 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid comment ID", success: false },
        { status: 400 }
      );
    }

    // Get current comment before update
    const currentComment = await CommentModel.findById(id);
    if (!currentComment) {
      return NextResponse.json(
        { message: "Comment not found", success: false },
        { status: 404 }
      );
    }

    // Update comment
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { isAccept },
      { new: true }
    );

    await sincAllScoresOfProduct(currentComment.productID);


    return NextResponse.json(
      {
        message: `Comment ${isAccept ? "approved" : "rejected"} successfully.`,
        data: updatedComment,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/comments error:", err);
    return NextResponse.json(
      {
        message: err.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
