import Banner from "@/components/modules/banner/Banner";
import LatestArticles from "@/components/templates/index/latestArticles/LatestArticles";
import LatestProducts from "@/components/templates/index/latestProducts/LatestProducts";
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
      <Banner />
      <LatestProducts />
      <Promote />
      <LatestArticles />
    </>
  );
}
