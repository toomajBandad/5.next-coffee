import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";
import "@/models/Comment";

export async function GET() {
  try {
    await connectToDB();
    const products = await ProductModel.find({}).populate("comments");

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

    const { name, price, shortDesc, desc, weight, suitable, smell, tags } =
      await req.json();

    const newProduct = await ProductModel.create({
      name,
      price,
      shortDesc,
      desc,
      weight,
      suitable,
      smell,
      tags,
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
