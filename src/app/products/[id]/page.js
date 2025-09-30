import Detail from "@/components/templates/products/Detail";
import MoreSameProducts from "@/components/templates/products/MoreSameProducts";
import Tabs from "@/components/templates/products/Tabs";
import productModel from "@/models/Product";
import "@/models/Comment";
import connectToDB from "@/configs/db";
import React from "react";

export default async function Product({ params }) {
  await connectToDB();

  try {
    const { id } = await params;
    const productID = id;
    if (!productID) throw new Error("Missing product ID");

    const product = JSON.parse(
      JSON.stringify(
        await productModel.findById(productID).populate("comments")
      )
    );

    if (!product) throw new Error("Product not found");

    const relatedProduct = await productModel
      .find({ smell: product.smell, _id: { $ne: product._id } })
      .sort({ score: -1 });

    return (
      <div>
        <Detail product={product} />
        <Tabs product={product} />
        <MoreSameProducts relatedProduct={relatedProduct} />
      </div>
    );
  } catch (error) {
    console.error("Product page error:", error);
    return (
      <div className="text-center py-20 text-gray-600">
        Product not found or failed to load.
      </div>
    );
  }
}
