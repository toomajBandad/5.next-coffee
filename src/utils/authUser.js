import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  await connectToDB();
  const cookieStore = await cookies(); // ✅ await cookies()
  const token = cookieStore.get("token");

  let user;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ username: tokenPayload.username });
    }
  } else {
    user = null;
  }

  return user;
};

export { authUser };
