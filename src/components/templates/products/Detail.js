import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import ProductInfo from "@/components/modules/productInfo/ProductInfo";
import React from "react";
import Gallery from "./Gallery";
import AddToWishList from "./AddToWishList";

function Detail({ product }) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 bg-white text-black">
      {/* Left Column */}
      <div className="flex flex-col gap-10 p-10">
        <Breadcrumb />
        <ProductInfo product={product} />

        <AddToWishList productID={product._id}/>
      </div>

      {/* Right Column */}
      <div>
        <Gallery product={product}/>
      </div>
    </div>
  );
}

export default Detail;
