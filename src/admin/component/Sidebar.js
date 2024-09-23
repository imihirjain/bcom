import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiFolderPlus, FiVideo, FiShoppingBag, FiBox } from 'react-icons/fi';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='mt-20 fixed font-corm'>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-3 bg-gray-900 text-white rounded-full fixed top-4 right-4"
      >
        ☰
      </button>

      <div className={`sidebar bg-gray-900 h-screen p-5 text-white flex flex-col fixed md:static ${open ? 'left-0' : '-left-full'} transition-all duration-300`}>
        <h1 className="text-2xl font-bold mb-5 text-center">Admin Panel</h1>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="/admin/overview" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiHome size={20} />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/all-orders" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiHome size={20} />
              <span>All Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/create-category" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiFolderPlus size={20} />
              <span>Create Category</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/create-collection" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiBox size={20} />
              <span>Create Collection</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/create-category-product" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiShoppingBag size={20} />
              <span>Create Category Product</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/create-collection-product" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiShoppingBag size={20} />
              <span>Create Collection  Product</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/media" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded transition-all duration-200">
              <FiVideo size={20} />
              <span>Slider Media</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
