import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import "@/models/Comment";
import { authUser } from "@/utils/authUser";

// For dynamic route: /api/users/[id]
export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "You are not authorized to perform this action",
          success: false,
        },
        { status: 401 }
      );
    }
    const { id } = await params;
    const selectedUser = await userModel.findById(id);
    if (!selectedUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const { username, email, role, phone } = await req.json();

    if (!username || !email || !role || !phone) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { username, email, phone, role },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "User updated successfully!",
        data: updatedUser,
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

    const user = await authUser();
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "You are not authorized to perform this action",
          success: false,
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const selectedUser = await userModel.findById(id);
    if (!selectedUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    await userModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "User deleted successfully!",
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
