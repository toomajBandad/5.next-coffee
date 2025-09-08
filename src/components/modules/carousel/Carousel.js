"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ArticleCard from "@/components/modules/articleCard/ArticleCard";

function Carousel() {
  const productArray = [
    { id: 1, title: "title", img: "/images/cards/1.jpg", price: 2000 },
    { id: 2, title: "title", img: "/images/cards/1.jpg", price: 2000 },
    { id: 3, title: "title", img: "/images/cards/1.jpg", price: 2000 },
    { id: 4, title: "title", img: "/images/cards/1.jpg", price: 2000 },
    { id: 5, title: "title", img: "/images/cards/1.jpg", price: 2000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        loop={true}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mb-10"
      >
        {productArray.map((product) => (
          <SwiperSlide className="mb-10" key={product.id}>
            <ArticleCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;