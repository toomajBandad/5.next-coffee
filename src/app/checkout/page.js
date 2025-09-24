import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import MainCheckout from "@/components/templates/checkout/MainCheckout";
import React from "react";

async function Checkout() {
  return (
    <div>
      <Navbar />
      <HeroTop route="cart" bg="/images/about/about3.jpg" />
      <MainCheckout />
    </div>
  );
}

export default Checkout;
