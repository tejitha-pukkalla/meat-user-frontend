import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories, fetchSubcategories } from "../../services/api";
import SubcategoryGrid from "../SubcategoryGrid";
import CategoryCarousel from "../CategoryCarosusel";

const SubcategoryPage = () => {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setCategoryLoading(true);
      const token = localStorage.getItem("token");
      const data = await fetchCategories(token);
      setCategories(data || []);
      setCategoryLoading(false);
    };
    loadCategories();
  }, []);

  useEffect(() => {
  const loadSubcategories = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const matchedCategory = categories.find(cat => cat.category_slug === categorySlug);
    if (!matchedCategory) {
      setSubcategories([]);
      setLoading(false);
      return;
    }

    const data = await fetchSubcategories(matchedCategory._id, token);
    const updated = data.map((item) => ({
      ...item,
      quantity: cart[item._id] || 0,
    }));
    setSubcategories(updated);
    setLoading(false);
  };

  if (categorySlug && categories.length > 0) {
    loadSubcategories();
  }
}, [categorySlug, cart, categories]);


  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item._id]: (prev[item._id] || 0) + 1,
    }));
  };

  const handleRemove = (item) => {
    setCart((prev) => {
      const newQty = (prev[item._id] || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[item._id];
        return updated;
      }
      return { ...prev, [item._id]: newQty };
    });
  };

  return (
    <div className="px-4 sm:px-10 py-6">
      <CategoryCarousel
        categories={categories}
        loading={categoryLoading}
        activeCategorySlug={categorySlug}
      />

      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <SubcategoryGrid
          subcategories={subcategories}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default SubcategoryPage;
