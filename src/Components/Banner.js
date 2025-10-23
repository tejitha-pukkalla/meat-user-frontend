import React, { useState, useEffect } from "react";
import { MUTTON_BANNER_URL, MUTTON_MEAT_URL, PRAWNS_BANNER_URL } from "./utils/constants";

const Banner = () => {
  const images = [
    MUTTON_BANNER_URL,
    MUTTON_MEAT_URL,
    PRAWNS_BANNER_URL
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);

  // Preload images
  useEffect(() => {
    const imgs = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    setPreloadedImages(imgs);
  }, []);

  // Banner rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="px-[37.8px]">
      <div className="w-full max-h-[300px] overflow-hidden relative">
        {preloadedImages.length > 0 && (
          <img
            src={preloadedImages[currentIndex].src}
            alt={`Banner ${currentIndex + 1}`}
            className="
              w-full 
              h-full 
              object-cover 
              transition-transform duration-500 ease-in-out
              sm:scale-100
              scale-110
            "
          />
        )}
      </div>
    </div>
  );
};

export default Banner;