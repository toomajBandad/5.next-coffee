import Detail from "@/components/templates/products/Detail";
import MoreSameProducts from "@/components/templates/products/MoreSameProducts";
import Tabs from "@/components/templates/products/Tabs";
import React from "react";

function Product() {
  return (
    <div>
      <Detail />
      <Tabs />
      <MoreSameProducts />
    </div>
  );
}

export default Product;
