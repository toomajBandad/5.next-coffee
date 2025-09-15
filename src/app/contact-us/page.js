import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import ContactForm from "@/components/templates/contact-us/ContactForm";
import Information from "@/components/templates/contact-us/Information";
import { authUser } from "@/utils/authUser";
import React from "react";

async function ContactUs() {
  const user = await authUser();
  return (
    <div>
      <Navbar isLogin={user ? true : false} />
      <HeroTop />
      <duv className="flex  items-center justify-center">
        <Information />
        <ContactForm />
      </duv>
    </div>
  );
}

export default ContactUs;
