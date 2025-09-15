import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/authUser";
import ContactUsClient from "@/components/templates/contact-us/ContactUsClient";

export default async function ContactUsPage() {
  const user = await authUser();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar isLogin={!!user} />
      <HeroTop />
      <ContactUsClient />
    </div>
  );
}