import Carousel from "@/components/modules/carousel/Carousel";
import TitleBar from "@/components/modules/titleBar/TitleBar";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import React from "react";

async function Articles() {
  await connectToDB();
  const latestArticles = await articleModel
    .find({})
    .limit(10)
    .sort({ createdAt: -1 });
  return (
    <div>
      <TitleBar
        title="Articles"
        subtitle="our latest articles"
        link="All Articles"
      />
      <Carousel latestArticles={JSON.parse(JSON.stringify(latestArticles))} />
    </div>
  );
}

export default Articles;
