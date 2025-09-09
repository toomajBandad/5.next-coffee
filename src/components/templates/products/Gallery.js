// components/modules/gallery/Gallery.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

const images = [
  '/images/carousel/banner1.jpg',
  '/images/carousel/banner2.jpg',
  '/images/carousel/banner3.jpg',
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-md">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-sm brightness-75 transition-all duration-500"
        style={{ backgroundImage: `url(${images[activeIndex]})` }}
      />

      {/* Carousel */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-3/4"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg border border-white shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}