import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/authUser";

async function Store() {
  const user = await authUser();
  return (
    <div>
      <Navbar
        isLogin={user ? true : false}
        isAdmin={user?.role === "ADMIN" ? true : false}
      />
      <HeroTop route="about-us" bg="/images/about/about3.jpg" />
      Store
    </div>
  );
}

export default Store;
