import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";

export const POST = async (req) => {
  await connectToDB();

  const body = await req.json();
  const { username, email, password, phone } = body;

  // Validate required fields
  if (!username || !email || !password || !phone) {
    return Response.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const isUserExist = await UserModel.findOne({
    $or: [{ username }, { email }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      { success: false, message: "User already exists" },
      { status: 422 }
    );
  }

  try {
    // Hash password
    const hashedPassword = await hashPassword(password);

    // Determine role based on whether any users exist
    const isFirstUser = !(await UserModel.exists({}));
    const role = isFirstUser ? "ADMIN" : "USER";

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Generate access token
    const accessToken = await generateAccessToken({
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    });

    // Return success response with secure cookie
    return Response.json(
      { success: true, message: "User created successfully" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken}; HttpOnly; Path=/; Max-Age=900; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.error("User creation error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
