import Card from "@/components/modules/card/Card";
import ProductCarousel from "@/components/modules/productCarousel/ProductCarousel";
import TitleBar from "@/components/modules/titleBar/TitleBar";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import React from "react";

async function LatestProducts() {
  await connectToDB();
  const latestProducts = await productModel
    .find()
    .limit(8)
    .sort({ _id: -1 })
    .lean();

  return (
    <div data-aos="fade-up">
      <TitleBar
        title="Latest Products"
        subtitle="See our best coffees"
        link="See All"
        href="store"
      />

      <ProductCarousel
        latestProducts={JSON.parse(JSON.stringify(latestProducts))}
      />
    </div>
  );
}

export default LatestProducts;
