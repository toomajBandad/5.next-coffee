import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToDB from "@/configs/db";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }

    const {
      name,
      price,
      shortDesc,
      desc,
      weight,
      suitable,
      smell,
      tags,
      score,
    } = await req.json();

    if (
      !name ||
      !price ||
      !shortDesc ||
      !desc ||
      !weight ||
      !suitable ||
      !smell
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled", success: false },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        shortDesc,
        desc,
        weight,
        suitable,
        smell,
        tags: Array.isArray(tags) ? tags.map((tag) => String(tag).trim()) : [],
        score: score ?? 5,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product updated successfully!",
        data: updatedProduct,
        success: true,
      },
      { status: 200 }
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

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product deleted successfully!",
        data: deletedProduct,
        success: true,
      },
      { status: 200 }
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
