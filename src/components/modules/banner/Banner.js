"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

// Banner images
import banner1 from "../../../../public/images/webbanners/10.jpg";
import banner2 from "../../../../public/images/webbanners/8.jpg";
import banner3 from "../../../../public/images/webbanners/9.jpg";
import banner4 from "../../../../public/images/webbanners/1.jpg";
import banner5 from "../../../../public/images/webbanners/3.jpg";
import banner6 from "../../../../public/images/webbanners/12.jpg";

const banners = [
  {
    id: 1,
    img: banner1,
    title: "Discover Single-Origin Perfection",
    text: "Explore the unique flavor profiles of our ethically sourced beans.",
  },
  {
    id: 2,
    img: banner2,
    title: "Brew Like a Barista",
    text: "Master your morning ritual with expert brewing guides.",
  },
  {
    id: 3,
    img: banner3,
    title: "Limited Edition Roasts",
    text: "Get early access to our seasonal micro-lots.",
  },
  {
    id: 4,
    img: banner4,
    title: "Sustainability in Every Sip",
    text: "Building a better coffee future through direct-trade partnerships.",
  },
  {
    id: 5,
    img: banner5,
    title: "Coffee Education Hub",
    text: "Learn the science, history, and culture behind every cup.",
  },
  {
    id: 6,
    img: banner6,
    title: "Your Coffee, Your Way",
    text: "Customize your subscription and brew with confidence.",
  },
];

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
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[250px] md:h-[600px] lg:h-[800px]">
              {/* Banner Image */}
              <Image
                src={banner.img}
                alt={`Banner ${banner.id}`}
                fill
                className="object-cover w-full h-full"
                priority={banner.id === 1}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />

              {/* Overlay Text - Bottom Left */}
              <div className="absolute top-1/4 left-6 md:left-1/10 z-20 text-white max-w-xl">
                <h2 className="text-xl md:text-5xl font-semibold leading-tight underline">
                  {banner.title}
                </h2>
                <p className="mt-5 text-sm md:text-xl leading-relaxed bg-black/50 px-3">
                  {banner.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;