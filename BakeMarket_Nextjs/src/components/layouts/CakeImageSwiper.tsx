// src/components/CakeImageSwiper.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { API_URL } from "@/utils/BaseUrl";

export default function CakeImageSwiper({ images }: { images: any[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full max-w-xl mb-4"
    >
      {images.map(
        (img, idx) => (
          console.log(img.length),
          (
            <SwiperSlide key={idx}>
              <img
                src={`${API_URL}/api/images/file/${img}`}
                alt={`Ảnh ${idx + 1}`}
                className="w-full h-64 object-cover rounded"
              />
            </SwiperSlide>
          )
        )
      )}
    </Swiper>
  );
}
