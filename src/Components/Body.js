import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../services/api";
import Banner from "./Banner";
import { Bike } from "lucide-react";

const Body = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const cats = await fetchCategories(token);
      setCategories(cats || []);
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <div className="p-4">
      <Banner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 mt-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Explore by Category</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Farm Fresh Meats and Seafood!</p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Bike className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-red-600">Delivery in 90 Minutes</span>
        </div>
      </div>

      {/* Category Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300" />
              <div className="mt-2 w-20 h-4 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-20">
          {categories.map(({ _id, category_name, category_image, category_slug }) => (
            <div
              key={_id}
              className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => navigate(`/category/${category_slug}`)}
            >
              <img
                src={category_image?.url}
                alt={category_name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
              />
              <p className="mt-2 text-sm font-semibold text-center text-gray-700">
                {category_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
