import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";

export const POST = async (req) => {
  await connectToDB();
  const cookieStore = await cookies();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  try {
    const accessToken = generateAccessToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    await UserModel.findOneAndUpdate(
      { email },
      { $set: { refreshToken } },
      { new: true }
    );

    cookieStore.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 24 * 60 * 60,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User login successfully",
        user: {
          username: user.username,
          role: user.role,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
