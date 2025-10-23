import React from "react";

const SubcategoryGrid = ({ subcategories, onAdd, onRemove }) => {
  const fallbackImage =
    "https://res.cloudinary.com/demo/image/upload/v1699999999/default-meat.jpg";

  if (!subcategories?.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        Available Cuts
      </h2>

      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6 
          justify-items-center
        "
      >
        {subcategories.map((item) => (
          
          <div
            key={item._id}
            className="
              bg-white 
              rounded-lg 
              shadow-md 
              p-4 
              relative 
              hover:shadow-lg 
              transition 
              duration-200 
              flex 
              flex-col
              w-full
              max-w-[300px]
              min-w-[250px]
            "
          >
            
            {/* Image */}
            <img
              src={item.subcategory_image?.url || fallbackImage}
              alt={item.subcategory_name}
              className="w-full h-40 object-cover rounded-md"
            />

            {/* Title */}
            <h3 className="text-base font-semibold mt-2 text-gray-800 line-clamp-2">
              {item.subcategory_name || "Chicken Cut"}
            </h3>

            {/* Delivery Info */}
            <p className="text-xs text-gray-500 italic mt-1">
              Delivering in 30 mins
            </p>

            {/* Weight */}
            <p className="text-xs text-gray-600">
              18–20 Pieces | 480–500 gms
            </p>

            {/* Price */}
            <p className="text-md font-bold text-red-600 mt-1">
              ₹{Number(item.sub_price) || 284}
              {item.sub_price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{Number(item.sub_price)}
                </span>
              )}
            </p>


            {/* Add / Quantity Buttons */}
            <div className="absolute bottom-4 right-4">
              {item.quantity && item.quantity > 0 ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onRemove(item)}
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onAdd(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onAdd(item)}
                  className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 cursor-pointer text-sm"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryGrid;
