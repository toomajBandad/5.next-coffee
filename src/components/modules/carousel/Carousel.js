"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ArticleCard from "@/components/articleCard/ArticleCard";

function Carousel() {
  const productArray = [
    {
      id: 1,
      title: "title",
      img: "../../../../public/images/cards/1.jpg",
      price: 2000,
    },
    {
      id: 2,
      title: "title",
      img: "../../../../public/images/cards/1.jpg",
      price: 2000,
    },
    {
      id: 3,
      title: "title",
      img: "../../../../public/images/cards/1.jpg",
      price: 2000,
    },
    {
      id: 4,
      title: "title",
      img: "../../../../public/images/cards/1.jpg",
      price: 2000,
    },
    {
      id: 5,
      title: "title",
      img: "../../../../public/images/cards/1.jpg",
      price: 2000,
    },
  ];
  return (
    <>
      <Swiper
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {productArray.map((product) => (
          <SwiperSlide
            key={product.id}
            className="bg-gray-200 h-64 flex items-center justify-center text-2xl font-bold text-gray-700 rounded-lg"
          >
            <ArticleCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Carousel;
