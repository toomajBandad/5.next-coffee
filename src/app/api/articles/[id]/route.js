import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";

// PUT /api/articles/:id → Edit article
export async function PUT(req, { params }) {
  await connectToDB();
  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await ArticleModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Article updated successfully!",
      data: updated,
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Update failed", success: false },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/:id → Delete article
export async function DELETE(req, { params }) {
  await connectToDB();
  const { id } = await params;
  try {
    const deleted = await ArticleModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Article deleted successfully!",
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Delete failed", success: false },
      { status: 500 }
    );
  }
}
