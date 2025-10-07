import React from "react";
import productModel from "@/models/Product";
import Card from "@/components/modules/card/Card";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import PageTitle from "@/components/modules/pageTitle/PageTitle";
import connectToDB from "@/configs/db";

async function Store() {
  let products = [];

  try {
    await connectToDB();
    products = await productModel.find({}).lean();
  } catch (err) {
    console.error("Error loading products:", err);
  }

  return (
    <div>
      <HeroTop route="store" bg="/images/webbanners/1.jpg" />
      <div className="lg:px-30 md:p-5 sm:p-3 p-2">
        <PageTitle
          title="Discover Our Coffee Collection"
          subtitle="Handpicked, roasted, and curated for every kind of coffee lover."
        />

        <div
          data-aos="fade-up"
          className="items-center grid grid-cols-1 px-4 md:px-10 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 mx-auto"
        >
          {products.map((product) => (
            <Card key={product._id} product={JSON.parse(JSON.stringify(product))} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
