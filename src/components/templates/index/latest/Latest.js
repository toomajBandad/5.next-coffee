import Card from "@/components/modules/card/Card";
import TitleBar from "@/components/modules/titleBar/TitleBar";
import React from "react";

function Latest() {
  const productArray = [
    { id: 1, title: "title", img: "../../../../public/images/cards/1.jpg", price: 2000 },
    { id: 2, title: "title", img: "../../../../public/images/cards/1.jpg", price: 2000 },
    { id: 3, title: "title", img: "../../../../public/images/cards/1.jpg", price: 2000 },
    { id: 4, title: "title", img: "../../../../public/images/cards/1.jpg", price: 2000 },
    { id: 5, title: "title", img: "../../../../public/images/cards/1.jpg", price: 2000 },
  ];

  return (
    <div className="">
      <TitleBar title="Latest Products" subtitle="See our best coffees" link="See All" />
      <div data-aos="fade-up" className="items-center grid grid-cols-1 px-4 md:px-10 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto">
        {productArray.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Latest;
