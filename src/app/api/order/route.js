import connectToDB from "@/configs/db";
import OrderModel from "@/models/Order";
import { NextResponse } from "next/server";
import "@/models/User";

export async function GET() {
  try {
    await connectToDB();
    // const orders = await OrderModel.find({}, "-__v").populate("userId");
    const orders = await OrderModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "Orders fetched successfully!",
        data: orders,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch Orders",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { userId, items, total, status } = body;

    if (!userId || !Array.isArray(items) || items.length === 0 || !total) {
      return NextResponse.json(
        {
          message: "Missing required fields: userId, items, or total",
          success: false,
        },
        { status: 400 }
      );
    }

    for (const item of items) {
      if (
        !item.productId ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          {
            message:
              "Invalid item format: each item must have productId and positive quantity",
            success: false,
          },
          { status: 400 }
        );
      }
    }

    const newOrder = await OrderModel.create({
      userId,
      items,
      total,
      status: status || "Pending",
    });

    return NextResponse.json(
      {
        message: "Order created successfully!",
        data: newOrder,
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      {
        message: err.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
