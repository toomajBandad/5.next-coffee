import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import "@/models/Comment";
import { authUser } from "@/utils/authUser";

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

    const { address } = await req.json();

    if (!address) {
      return NextResponse.json(
        {
          message: "Missing address fields",
          success: false,
        },
        { status: 400 }
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { address },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "address updated successfully!",
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
