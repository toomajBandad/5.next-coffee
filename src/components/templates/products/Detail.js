"use client";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import ProductInfo from "@/components/modules/productInfo/ProductInfo";
import React from "react";
import useBreadcrumbItems from "@/hooks/breadCrumbItemHook";
import Gallery from "./Gallery";

function Detail({product}) {
  const items = useBreadcrumbItems();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 bg-white text-black">
      {/* Left Column */}
      <div className="flex flex-col gap-20 p-10">
        <Breadcrumb items={items}/>
        <ProductInfo product={product}/>
      </div>

      {/* Right Column */}
      <div>
        <Gallery />
      </div>
    </div>
  );

}

export default Detail;
