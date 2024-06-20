import React from "react";
import { Link } from "react-router-dom";

const popularFoods = [
  {
    id: "1",
    product_name: "Aloo Paratha",
    product_thumbnail: "",
  },
  {
    id: "2",
    product_name: "Dosa",
    product_thumbnail: "",
  },
  {
    id: "3",
    product_name: "Gulab Jamun",
    product_thumbnail: "",
  },
];

export default function PopularFoods() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-h-10">
      <h1 className="text-xl font-bold mb-4 ">Popular Foods</h1>
      <div className="mt-4 flex flex-col">
        {popularFoods.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center gap-4 p-3 border rounded-lg shadow-sm hover:no-underline"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
              {product.product_thumbnail ? (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={product.product_thumbnail}
                  alt={product.product_name}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <span className="text-lg font-medium text-black">
              {product.product_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
