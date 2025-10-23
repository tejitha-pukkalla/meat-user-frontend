import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories, fetchSubcategories, fetchProducts } from "../services/api";
import SubcategoryCard from "./SubcategoryGrid";
import ProductCards from "./ProductCards";

const CategoryPage = () => {
  const { slug } = useParams();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const [cats, subs, prods] = await Promise.all([
        fetchCategories(token),
        fetchSubcategories(token),
        fetchProducts(token),
      ]);
      setCategories(cats);
      setSubcategories(subs);
      setProducts(prods);
    };
    loadData();
  }, [slug]);



  const selectedCategory = categories.find((cat) => cat.category_slug === slug);
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.parent_category_id?._id === selectedCategory?._id
  );
  const filteredProducts = products.filter(
    (prod) => prod.subcategory_id === selectedSubcategoryId
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {selectedCategory?.category_name || "Category"}
      </h2>

      <SubcategoryCard
        subcategories={filteredSubcategories}
        onSelect={(subId) => setSelectedSubcategoryId(subId)}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCards
            key={product._id}
            name={product.product_name}
            price={product.price}
            weight={product.weight}
            image={product.product_image?.url}
            quantity={0}
            onAdd={() => console.log("Add", product._id)}
            onRemove={() => console.log("Remove", product._id)}
            subcategoryName={product.subcategory_name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
