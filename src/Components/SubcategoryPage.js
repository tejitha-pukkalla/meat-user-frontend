// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSubcategories, fetchProducts } from "../services/api";
// import ProductCards from "./ProductCards";

// const SubcategoryPage = () => {
//   const { slug } = useParams();
//   const token = localStorage.getItem("token");

//   const [subcategory, setSubcategory] = useState(null);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const subs = await fetchSubcategories(token);
//       const sub = subs.find((s) => s.subcategory_slug === slug);
//       setSubcategory(sub);
//       const allProducts = await fetchProducts(token);
//       const filtered = allProducts.filter(
//         (p) => p.subcategory_id === sub?._id
//       );
//       setProducts(filtered);
//     };
//     loadData();
//   }, [slug]);

//   if (!subcategory) return <p className="p-4 text-gray-500">Subcategory not found.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         {subcategory.subcategory_name}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCards
//             key={product._id}
//             name={product.product_name}
//             price={product.price}
//             weight={product.weight}
//             image={product.product_image?.url}
//             quantity={0}
//             onAdd={() => console.log("Add", product._id)}
//             onRemove={() => console.log("Remove", product._id)}
//             subcategoryName={subcategory.subcategory_name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubcategoryPage;
