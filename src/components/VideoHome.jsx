import React, { useEffect, useState } from "react";
import { FaTruck, FaGlobe } from "react-icons/fa"; // Importing react icons
import axios from "axios";

const VideoHome = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          "https://bcom-backend.onrender.com/api/video"
        );
        if (response.data && response.data.length > 0) {
          setVideoUrl(response.data[0].videoUrl); // Assuming the first video is used
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <div className="">
      {/* Video Section */}
      <div className="w-screen h-screen overflow-hidden bg-black">
        {videoUrl ? (
          <video
            className="object-cover w-full h-full opacity-70 transition-all duration-1000 ease-in-out"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={videoUrl} // Use the fetched video URL
          />
        ) : (
          <div className="text-white text-center">Loading Video...</div> // Loading state
        )}
      </div>

      {/* <div className="flex justify-between  mt-[30px] max-w-md mx-auto">
        <div className="flex  flex-col items-center">
          <FaTruck className="text-3xl text-gray-800" />
          <p className="mt-2 text-gray-700 font-indif font-bold text-xl">
            Free Shipping
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaGlobe className="text-3xl text-gray-800" />{" "}
          <p className="mt-2 text-gray-700 font-indif font-bold text-xl">
            Worldwide Delivery
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default VideoHome;
