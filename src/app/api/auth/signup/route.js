import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export const GET = async () => {
  await connectToDB();
  try {
    const users = await UserModel.find({});
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to fetch users" }, { status: 500 });
  }
};
