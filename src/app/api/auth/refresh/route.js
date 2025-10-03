import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifyRefreshToken, generateAccessToken } from "@/utils/auth";

export const POST = async (req) => {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");

    if (!refreshToken?.value) {
      return NextResponse.json(
        { message: "User not authorized!", success: false },
        { status: 401 }
      );
    }

    const isRefreshValid = verifyRefreshToken(refreshToken.value);
    if (!isRefreshValid) {
      return NextResponse.json(
        { message: "Refresh token is not valid!", success: false },
        { status: 403 }
      );
    }

    const user = await UserModel.findOne({ refreshToken: refreshToken.value });
    if (!user) {
      return NextResponse.json(
        { message: "User not found!", success: false },
        { status: 403 }
      );
    }

    const newAccessToken = generateAccessToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    cookieStore.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 24 * 60 * 60, // 60 days
    });

    return NextResponse.json(
      {
        message: "New access token generated successfully",
        success: true,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
};
