import connectToDB from "@/configs/db";
import discountModel from "@/models/Discount";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const discounts = await discountModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "Discounts fetched successfully!",
        departments: discounts,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch Discounts",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { productID, code, percent, maxUse, useTimes } = await req.json();

    const newDiscount = await discountModel.create({
      productID,
      code,
      percent,
      maxUse,
    });

    return NextResponse.json(
      {
        message: "Discount created successfully!",
        data: newDiscount,
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
