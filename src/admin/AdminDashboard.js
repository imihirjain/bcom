import React from 'react';
import Sidebar from './component/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen font-corm">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
