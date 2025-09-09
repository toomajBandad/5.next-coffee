import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";

export const POST = async (req) => {
  await connectToDB();

  const { email, password } = await req.json();

  // Validate required fields
  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid email or password" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid email or password" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Generate access token
    const accessToken = await generateAccessToken({
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
      { $set: { refreshToken: refreshToken } },
      { new: true }
    );

    // Return success response with secure cookie
    return new Response(
      JSON.stringify({
        success: true,
        message: "User login successfully",
        user: {
          username: user.username,
          role: user.role,
          email: user.email,
        },
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken}; HttpOnly; Path=/;`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
