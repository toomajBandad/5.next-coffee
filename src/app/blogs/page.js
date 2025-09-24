import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import React from "react";

async function Blogs() {
  return (
    <div>
      <Navbar />
      <HeroTop route="blogs" bg="/images/about/about3.jpg" />
      Blogs
    </div>
  );
}

export default Blogs;
