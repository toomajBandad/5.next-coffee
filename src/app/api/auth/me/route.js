import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Await cookies API and extract token
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    // If no token, return unauthorized
    if (!token) {
      return NextResponse.json(
        {
          message: "Token not found. Authorization failed.",
          data: null,
          success: false,
        },
        { status: 401 }
      );
    }

    // Verify token
    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return NextResponse.json(
        {
          message: "Invalid or expired token.",
          data: null,
          success: false,
        },
        { status: 403 }
      );
    }

    // Find user by username, exclude sensitive fields
    const user = await UserModel.findOne(
      { username: tokenPayload.username },
      "-password -refreshToken -__v"
    );

    // If user not found
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
          data: null,
          success: false,
        },
        { status: 404 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: "User fetched successfully.",
        data: user,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Internal server error.",
        success: false,
      },
      { status: 500 }
    );
  }
}