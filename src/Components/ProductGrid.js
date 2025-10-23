import React from "react";

const ProductGrid = ({ products, onAdd }) => {
  if (!products?.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => {
          const variant = product.variants?.[0]; // default variant
          const price = variant?.selling_price || product.min_price;
          const image = product.primary_image || product.images?.[0]?.image_url;

          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 relative hover:shadow-lg transition duration-200 flex flex-col w-full max-w-[300px] min-w-[250px]"
            >
              {/* ✅ image */}
              <img
                src={image}
                alt={product.product_name}
                className="w-full h-40 object-cover rounded-md"
              />

              {/* ✅ product name */}
              <h3 className="text-base font-semibold mt-2 text-gray-800 line-clamp-2">
                {product.product_name}
              </h3>

              {/* ✅ small info */}
              <p className="text-xs text-gray-500 italic mt-1">
                Delivering in 30 mins
              </p>

              {/* ✅ description */}
              <p className="text-xs text-gray-600 line-clamp-2">
                {product.short_description || "No description available"}
              </p>

              {/* ✅ price */}
              <p className="text-md font-bold text-red-600 mt-1">
                ₹{price}
              </p>

              {/* ✅ Add button */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => onAdd?.(product)}
                  className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 cursor-pointer text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
