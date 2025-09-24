import React from "react";
import image1 from "@images/about/about1.jpg";
import image2 from "@images/about/about2.jpg";
import image3 from "@images/about/about3.jpg";
import Image from "next/image";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/authUser";

async function About() {
  const user = await authUser();
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        isLogin={user ? true : false}
        isAdmin={user?.role === "ADMIN" ? true : false}
      />
      <HeroTop route="about-us" bg="/images/about/about3.jpg" />

      {/* Image Gallery */}
      <section className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="overflow-hidden rounded-lg">
          <Image
            width={200}
            height={200}
            src={image1}
            alt="Coffee Shop Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={200}
            height={200}
            src={image2}
            alt="Coffee Beans and Powder"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={200}
            height={200}
            src={image3}
            alt="Coffee Product Display"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Our Story</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-400 text-sm sm:text-base">
          Born from a love of bold flavors and timeless design, Toomaj Coffee
          began as a small roastery with a big dream: to bring ethically
          sourced, expertly roasted coffee to every corner of the world. Today,
          we offer a curated selection of beans, powders, and brewing tools —
          all crafted to elevate your coffee ritual.
        </p>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center px-6 pb-16">
        <a
          href="/shop"
          className="mt-6 inline-block rounded border border-white px-6 py-2 text-sm font-medium transition duration-300 hover:bg-white hover:text-black"
        >
          Explore Our Coffee
        </a>
      </section>
    </div>
  );
}

export default About;
