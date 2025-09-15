import Banner from "@/components/modules/banner/Banner";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export default async function Home() {
  connectToDB();
  const userCookies = await cookies();
  const token = userCookies.get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await userModel.findOne({ username: tokenPayload.username });
    }
  }

  return (
    <>
      <Navbar  isLogin = {user ? true : false}/>
      <Banner />
      <Latest />
      <Promote />
      <Articles />
    </>
  );
}
