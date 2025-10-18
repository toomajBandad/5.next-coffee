import { NextResponse } from "next/server";
import OrderModel from "@/models/Order";
import connectToDB from "@/configs/db";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Model ID is required", success: false },
        { status: 400 }
      );
    }

    const { userId, items, total, status, address } = await req.json();

    if (!userId || !items || !total || !status || !address) {
      return NextResponse.json(
        { message: "All required fields must be filled", success: false },
        { status: 400 }
      );
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        userId,
        items,
        total,
        status,
        address,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Order not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Order updated successfully!",
        data: updatedOrder,
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

    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json(
        { message: "Order not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Order deleted successfully!",
        data: deletedOrder,
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
