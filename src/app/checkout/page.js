import HeroTop from "@/components/modules/heroTop/HeroTop";
import MainCheckout from "@/components/templates/checkout/MainCheckout";
import { authUser } from "@/utils/authUser";
import React from "react";

async function Checkout() {
  const user = await authUser();
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4">
          You must be logged in to access the checkout page.
        </p>
        <a
          href="/login-register"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </a>
      </div>
    );
  }
  return (
    <div>
      <HeroTop route="cart" bg="/images/about/about3.jpg" />
      <MainCheckout user={JSON.parse(JSON.stringify(user))}/>
    </div>
  );
}

export default Checkout;
