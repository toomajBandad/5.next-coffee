import React from "react";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import ProductInfo from "@/components/modules/productInfo/ProductInfo";
import Gallery from "./Gallery";
import AddToWishList from "./AddToWishList";

export default function Detail({ product }) {
  return (
    <main>
      <section className=" mx-auto px-4 py-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <Breadcrumb />
            <ProductInfo product={product} />
            <AddToWishList productID={product._id} />
          </div>

          {/* Right Column */}
          <div className="p-4">
            <Gallery product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}