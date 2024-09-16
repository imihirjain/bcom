import React from "react";

const ProductCard = () => {
  return (
    <div className=" max-w-md overflow-hidden group hover:cursor-pointer">
      <div className="relative h-[80vh] w-full overflow-hidden object-fit">
        {/* Image Section */}
        <img
          src="https://angadsinghofficial.com/cdn/shop/files/LOOK_22_3364_460x.jpg?v=1718475515"
          alt="Black Georgette Saree"
          className="object-fit h-full w-full"
        />
        <div className="absolute top-2 right-2 bg-white text-red-500 text-xs px-2 py-1">
          Ready To Ship
        </div>

        {/* Angle Left Button (hidden initially, shown on hover) */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-slate-100 text-black px-3 rounded-sm">
            &#8249; {/* Left angle icon */}
          </button>
        </div>

        {/* Angle Right Button (hidden initially, shown on hover) */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-slate-100 text-black px-3 rounded-sm">
            &#8250; {/* Right angle icon */}
          </button>
        </div>

        {/* Quick Buy Button at the bottom */}
        <div className="absolute bottom-1 left-1 right-1 bg-opacity-70 bg-black opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full rounded-sm text-black bg-white py-2 px-4">
            Quick Buy
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Black Georgette Saree
        </h2>
        <p className="text-gray-500">Rs. 58,500.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
