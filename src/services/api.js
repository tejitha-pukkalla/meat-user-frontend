export const fetchCategories = async (token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch("http://localhost:4000/api/public/categories", {headers});
  const json = await res.json();
  return json.data || [];
};




export const fetchSubcategories = async (categoryId, token) => {
  const res = await fetch(`http://localhost:4000/api/public/subcategories/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return json.data || [];
};


// export const fetchProducts = async (subcategoryId, token) => {
//   const res = await fetch(`http://localhost:4000/api/public/products?/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const json = await res.json();
//   return json.data || [];
// };
