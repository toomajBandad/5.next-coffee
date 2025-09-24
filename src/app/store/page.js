import React from "react";
import Navbar from "@/components/modules/navbar/Navbar";
import productModel from "@/models/Product";
import Card from "@/components/modules/card/Card";
import TitleBar from "@/components/modules/titleBar/TitleBar";

async function Store() {
  const products = await productModel.find({});
  return (
    <div>
      <Navbar />
      <div className="lg:px-30 md:p-5 sm:p-3 p-2">
        <div
          data-aos="fade-up"
          className="items-center grid grid-cols-1 px-4 md:px-10 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 mx-auto"
        >
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
