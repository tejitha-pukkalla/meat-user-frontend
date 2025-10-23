// import { useEffect, useState } from "react";
// import Category from "./Category";
// import SubcategoryGrid from "./SubcategoryGrid";

// const ExplorePage = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingSubcategories, setLoadingSubcategories] = useState(false);

//   const token = localStorage.getItem("token"); // Or use context/store

//   useEffect(() => {
//     setLoadingCategories(true);
//     fetch("http://localhost:4000/api/category", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         setCategories(json.data.categories);
//         setLoadingCategories(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch categories", err);
//         setLoadingCategories(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedCategoryId) return;
//     setLoadingSubcategories(true);
//     fetch(`http://localhost:4000/api/category/${selectedCategoryId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         setSubcategories(json.data.subcategories);
//         setLoadingSubcategories(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch subcategories", err);
//         setLoadingSubcategories(false);
//       });
//   }, [selectedCategoryId]);

//   return (
//     <div className="px-4 sm:px-8">
//       <Category
//         categories={categories}
//         selectedCategoryId={selectedCategoryId}
//         setSelectedCategoryId={setSelectedCategoryId}
//         loading={loadingCategories}
//       />
//       {selectedCategoryId && (
//         <SubcategoryGrid
//           subcategories={subcategories}
//           loading={loadingSubcategories}
//         />
//       )}
//     </div>
//   );
// };

// export default ExplorePage;
