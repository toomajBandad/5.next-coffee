import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";

export const POST = async (req) => {
  await connectToDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return Response.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return Response.json(
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

    const cookieStore = cookies();

    cookieStore.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 24 * 60 * 60, // 60 days
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 24 * 60 * 60, // 15 days
    });

    return Response.json(
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
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};