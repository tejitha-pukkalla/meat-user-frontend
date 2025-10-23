import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/api"; // adjust path if needed
import ProductGrid from "../ProductGrid";


const ProductPage = () => {
  const { subcategoryId } = useParams(); // assuming route like /subcategory/:subcategoryId
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchProducts(subcategoryId, token);
        console.log("Fetched products:", data); // 👀 check console
        setProducts(data.products || []); // ✅ FIXED LINE
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [subcategoryId]);

  if (loading) return <p>Loading...</p>;

  if (products.length === 0)
    return <p className="text-center mt-8 text-gray-500">No products found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Products
      </h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductPage;
