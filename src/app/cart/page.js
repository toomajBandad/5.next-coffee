import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";
import CartTable from "@/components/templates/userCart/CartTable";
import React from "react";

async function UserCart() {
  return (
    <div>
      <Navbar />
      <HeroTop route="cart" bg="/images/about/about3.jpg" />
      <CartTable />
    </div>
  );
}

export default UserCart;
