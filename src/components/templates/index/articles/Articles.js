import Carousel from "@/components/modules/carousel/Carousel";
import TitleBar from "@/components/modules/titleBar/TitleBar";
import React from "react";

function Articles() {
  return (
    <div>
      <TitleBar
        title="Articles"
        subtitle="our latest articles"
        link="All Articles"
      />
      <Carousel />
    </div>
  );
}

export default Articles;
