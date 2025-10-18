import React from "react";
import productModel from "@/models/Product";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import PageTitle from "@/components/modules/pageTitle/PageTitle";
import connectToDB from "@/configs/db";
import StoreMain from "@/components/templates/store/StoreMain";

export default async function Store({ searchParams }) {
  await connectToDB();

  const origins = await productModel.distinct("origin");
  const roastLevels = await productModel.distinct("roastLevel");
  const types = await productModel.distinct("type");
  const smells = await productModel.distinct("smell");

  const query = {};
   searchParams = (await searchParams) || {};
  if (searchParams.roastLevel) query.roastLevel = searchParams.roastLevel;
  if (searchParams.origin) query.origin = searchParams.origin;
  if (searchParams.type) query.type = searchParams.type;
  if (searchParams.smell) query.smell = searchParams.smell;

  if (searchParams.priceMin || searchParams.priceMax) {
    query.price = {};
    if (searchParams.priceMin) query.price.$gte = Number(searchParams.priceMin);
    if (searchParams.priceMax) query.price.$lte = Number(searchParams.priceMax);
  }

  if (searchParams.score) query.score = Number(searchParams.score);

  let products = [];
  try {
    products = await productModel.find(query).lean();
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
        <StoreMain
          products={JSON.parse(JSON.stringify(products))}
          origins={origins}
          roastLevels={roastLevels}
          types={types}
          smells={smells}
        />
      </div>
    </div>
  );
}
