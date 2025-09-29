import HeroTop from "@/components/modules/heroTop/HeroTop";
import MainCheckout from "@/components/templates/checkout/MainCheckout";
import React from "react";

async function Checkout() {
  return (
    <div>
      <HeroTop route="cart" bg="/images/about/about3.jpg" />
      <MainCheckout />
    </div>
  );
}

export default Checkout;
