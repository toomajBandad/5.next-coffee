import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token"); 

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

    const user = await UserModel.findOne({ username: tokenPayload.username });

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

    return NextResponse.json(
      {
        message: "oh my god User fetched successfully.",
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
