import Card from "@/components/modules/card/Card";
import TitleBar from "@/components/modules/titleBar/TitleBar";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import React from "react";

async function LatestProducts() {
  await connectToDB();
  const recentProducts = await productModel
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
      <div className="items-center grid grid-cols-1 px-4 md:px-10 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto">
        {recentProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
