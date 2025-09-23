import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import "@/models/Comment";

export async function GET() {
  try {
    await connectToDB();
    const products = await ProductModel.find({}, "-__v").populate("comments");

    return NextResponse.json(
      {
        message: "Products fetched successfully!",
        data: products,
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

    const {
      name,
      brand,
      price,
      shortDesc,
      desc,
      weight,
      type,
      origin,
      roastLevel,
      smell,
      score,
      stock,
      tags,
      suitable,
      image,
    } = await req.json();

    const newProduct = await ProductModel.create({
      name,
      brand,
      price,
      shortDesc,
      desc,
      weight,
      type,
      origin,
      roastLevel,
      smell,
      score,
      stock,
      tags,
      suitable,
      image,
    });

    return NextResponse.json(
      {
        message: "Product created successfully!",
        data: newProduct,
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