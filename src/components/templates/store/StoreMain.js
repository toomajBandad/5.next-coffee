"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/components/modules/pagination/Pagination";
import Card from "@/components/modules/card/Card";

function StoreMain({ products }) {
  const itemsPerPage = 4;
  const totalItems = products.length;
  const [currentPage, setCurrentPage] = useState(1);
  //   const [currentProducts, setCurrentProducts] = useState(null);

  // ✅ Define the missing function
  const onPageChange = (page) => {
    setCurrentPage(page);

    const isMobile = window.innerWidth < 768; // Tailwind's md breakpoint
    const scrollTop = isMobile ? 300 : 500;

    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  // ✅ Slice products for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // setCurrentProducts(products.slice(indexOfFirstItem, indexOfLastItem));
  let currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div
        data-aos="fade-up"
        className="items-center grid grid-cols-1 px-4 md:px-6 lg:px-8 xl:px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 mx-auto"
      >
        {currentProducts &&
          currentProducts.length &&
          currentProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default StoreMain;
