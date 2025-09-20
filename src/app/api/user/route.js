import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { NextResponse } from "next/server";
import "@/models/Comment";
import { authUser } from "@/utils/authUser";

export async function GET() {
  try {
    await connectToDB();
    const user =await authUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this route",
          success: false,
        },
        { status: 401 }
      );
    }
    const users = await userModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "users fetched successfully!",
        data: users,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch users",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const user = await authUser();

    const { username, email, phone } = await req.json();

    if (!username || !email || !phone) {
      return NextResponse.json(
        {
          message: "error in inputs",
          success: false,
        },
        { status: 401 }
      );
    }

    const newUserDatas = await userModel.findByIdAndUpdate(
      user._id,
      { username, email, phone },
      { new: true } // returns the updated document
    );

    return NextResponse.json(
      {
        message: "User Updated successfully!",
        data: newUserDatas,
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
