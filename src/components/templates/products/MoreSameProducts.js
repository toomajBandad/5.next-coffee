import Card from "@/components/modules/card/Card";
import React from "react";

function MoreSameProducts({ relatedProduct }) {
  return (
    <div className="p-5 lg:p-40">
      <div>MoreSameProducts</div>
      <div>Carousel with cards</div>
      <div className="flex ga-5">
        {relatedProduct.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MoreSameProducts;
