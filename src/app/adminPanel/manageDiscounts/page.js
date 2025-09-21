import DiscountsEdit from "@/components/templates/p-admin/DiscountsEdit";
import connectToDB from "@/configs/db";
import discountModel from "@/models/Discount";
import React from "react";

async function ManageDiscounts() {
  await connectToDB();
  const discounts = await discountModel.find({}).lean();
  return (
    <div>
      <DiscountsEdit discounts={JSON.parse(JSON.stringify(discounts))} />
    </div>
  );
}

export default ManageDiscounts;
