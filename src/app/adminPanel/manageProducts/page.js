import ProductEdit from "@/components/templates/p-admin/ProductEdit";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import React from "react";

async function ManageProducts() {
  await connectToDB();
  const products = await productModel.find({}).lean();
  return (
    <div>
      <ProductEdit products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}

export default ManageProducts;
