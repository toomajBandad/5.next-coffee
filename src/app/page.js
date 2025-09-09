import Banner from "@/components/modules/banner/Banner";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import userModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { use } from "react";

export default async function Home() {
  const userCookies = await cookies();
  const token = userCookies?.get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = userModel.findOne({ email: tokenPayload.email });
    }
  }

  return (
    <>
      <Navbar user={user} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
