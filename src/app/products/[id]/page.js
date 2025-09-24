import Detail from "@/components/templates/products/Detail";
import MoreSameProducts from "@/components/templates/products/MoreSameProducts";
import Tabs from "@/components/templates/products/Tabs";
import { authUser } from "@/utils/authUser"; // Make sure this is server-only
import productModel from "@/models/Product";
import "@/models/Comment";
import connectToDB from "@/configs/db";
import Navbar from "@/components/modules/navbar/Navbar";
import React from "react";

export default async function Product({ params }) {
  await connectToDB();

  const user = await authUser();
  const resolvedParams = await params; // ✅ Await the dynamic API
  const productID = resolvedParams.id;

  const product = JSON.parse(
    JSON.stringify(await productModel.findById(productID).populate("comments"))
  );

  const relatedProduct = await productModel.find({ smell: product.smell });

  return (
    <div>
      <Navbar />
      <Detail product={product} />
      <Tabs product={product} />
      <MoreSameProducts relatedProduct={relatedProduct} />
    </div>
  );
}
