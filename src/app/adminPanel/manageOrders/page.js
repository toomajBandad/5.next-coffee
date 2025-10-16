import OrderEdit from "@/components/templates/p-admin/OrderEdit";
import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";
import React from "react";

async function CustomerMessages() {
  await connectToDB();
const orders = await orderModel
  .find({})
  .populate("userId", "username email") // user info
  .populate("items.productId", "name price") // product info
  .lean();


  return (
    <div>
      <OrderEdit orders={JSON.parse(JSON.stringify(orders))} />
    </div>
  );
}

export default CustomerMessages;
