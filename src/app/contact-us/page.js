import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import ContactUsClient from "@/components/templates/contact-us/ContactUsClient";

export default async function ContactUsPage() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroTop route="contact-us" bg="/images/webbanners/5.jpg" />
      <ContactUsClient />
    </div>
  );
}
