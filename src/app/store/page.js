import React from "react";
import productModel from "@/models/Product";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import PageTitle from "@/components/modules/pageTitle/PageTitle";
import connectToDB from "@/configs/db";
import StoreMain from "@/components/templates/store/StoreMain";

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
        <StoreMain products={JSON.parse(JSON.stringify(products))} />
      </div>
    </div>
  );
}

export default Store;
