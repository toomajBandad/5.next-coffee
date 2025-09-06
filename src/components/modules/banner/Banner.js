"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import banner1 from "../../../../public/images/carousel/banner1.jpg";
import banner2 from "../../../../public/images/carousel/banner2.jpg";
import banner3 from "../../../../public/images/carousel/banner3.jpg";
import banner4 from "../../../../public/images/carousel/banner4.jpg";
import banner5 from "../../../../public/images/carousel/banner5.jpg";
import banner6 from "../../../../public/images/carousel/banner6.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper "
      >
        <SwiperSlide className="">
          <Image
            className="w-full"
            src={banner1}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full"
            src={banner2}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full"
            src={banner3}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full"
            src={banner4}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full"
            src={banner5}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full"
            src={banner6}
            width={1200}
            height={500}
            alt="carouselImgs"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
