import HeroTop from "@/components/modules/heroTop/HeroTop";
import PageTitle from "@/components/modules/pageTitle/PageTitle";
import CartTable from "@/components/templates/userCart/CartTable";
import React from "react";

async function UserCart() {
  return (
    <div className="min-h-150">
      <HeroTop route="cart" bg="/images/webbanners/4.jpg" />
      <PageTitle
        title="Your Cart, Your Coffee Ritual"
        subtitle="Review your selections, refine your brew, and get ready to savor every sip."
      />
      <CartTable />
    </div>
  );
}

export default UserCart;
