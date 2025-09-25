import Navbar from "@/components/modules/navbar/Navbar";
import CartTable from "@/components/templates/userCart/CartTable";
import React from "react";

async function UserCart() {
  return (
    <div>
      <Navbar />
      <CartTable />
    </div>
  );
}

export default UserCart;
