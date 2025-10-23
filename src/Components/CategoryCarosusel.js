import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryCarousel = ({ categories, loading, activeCategorySlug }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isMobile) return;
    const activeItem = carouselRef.current?.querySelector(".active-category");
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [activeCategorySlug, isMobile]);

  if (loading) {
    return (
      <div className="flex justify-center gap-6 py-4 px-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative py-4 px-4 sm:px-10">
      {/* Scroll Arrows for mobile only */}
      {isMobile && categories.length > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Category Items */}
      <div
        ref={carouselRef}
        className={`w-full ${
          isMobile
            ? "flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
            : "flex flex-wrap justify-center gap-20"
        }`}
      >
        {categories.map(({ _id, category_name, category_image, category_slug }) => {
          const isActive = category_slug === activeCategorySlug;
          return (
            <div
              key={_id}
              className={`flex flex-col items-center min-w-[80px] sm:min-w-[100px] cursor-pointer transition-transform duration-200 hover:scale-105 ${
                isActive ? "active-category border-b-2 border-red-500 pb-1" : ""
              }`}
              onClick={() => navigate(`/category/${category_slug}`)}
            >
              <img
                src={category_image?.url}
                alt={category_name}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm ${
                  isActive ? "ring-2 ring-red-500" : ""
                }`}
              />
              <p
                className={`mt-1 text-xs font-medium text-center ${
                  isActive ? "text-red-600 font-semibold" : "text-gray-700"
                }`}
              >
                {category_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCarousel;
