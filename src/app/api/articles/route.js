import { NextResponse } from "next/server";
import ArticleModel from "@/models/Article";
import connectToDB from "@/configs/db";

// GET /api/articles
export async function GET() {
  await connectToDB();
  try {
    const articles = await ArticleModel.find().sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST /api/articles
export async function POST(req) {
  try {
    await connectToDB();
    const { title, subtitle, content, author, image, tags } = await req.json();

    if (!title || !content || !author) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const newarticle = await ArticleModel.create({
      title,
      subtitle,
      content,
      author,
      image,
      tags,
    });

    return NextResponse.json(
      {
        message: "article created successfully!",
        data: newarticle,
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
