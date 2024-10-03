// src/pages/ProfilePage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("https://bcom-backend.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response)
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
        console.error(err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profileData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-6">Your Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-lg font-semibold">{profileData.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-lg font-semibold">{profileData.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-600">Role:</span>
            <span className="text-lg font-semibold">{profileData.role}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mt-4">Your Orders:</h3>
            {profileData.orders && profileData.orders.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {profileData.orders.map((order, index) => (
                  <li key={index} className="border p-4 rounded shadow">
                    <p>Order ID: {order._id}</p>
                    {/* You can include more details about the order if available */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
