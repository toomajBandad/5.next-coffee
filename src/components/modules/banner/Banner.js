"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

// Banner images
import banner1 from "../../../../public/images/webbanners/10.jpg";
import banner2 from "../../../../public/images/webbanners/12.jpg";
import banner3 from "../../../../public/images/webbanners/3.jpg";
import banner4 from "../../../../public/images/webbanners/4.jpg";
import banner5 from "../../../../public/images/webbanners/5.jpg";
import banner6 from "../../../../public/images/webbanners/7.jpg";

const banners = [banner1, banner2, banner3, banner4, banner5, banner6];

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
        className="overflow-hidden shadow-lg"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
              {/* Banner Image */}
              <Image
                src={banner}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center z-20 px-4 text-white text-center">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                    Welcome to Next Coffee
                  </h2>
                  <p className="mt-2 text-sm md:text-lg drop-shadow-md">
                    Brew better. Learn deeper. Shop smarter.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;