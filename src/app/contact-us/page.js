import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import ContactUsClient from "@/components/templates/contact-us/ContactUsClient";

export default async function ContactUsPage() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroTop route="contact-us" bg="/images/webbanners/5.jpg" />
      <ContactUsClient />
    </div>
  );
}
