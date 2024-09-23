import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // To track upload progress
  const [videoUrl, setVideoUrl] = useState(''); // To store video URL after upload
  const [editMode, setEditMode] = useState(false); // Toggle between upload/update modes
  const [videoId, setVideoId] = useState(null); // For updating video by ID
  const [videos, setVideos] = useState([]); // To store fetched videos

  // Handle video file selection
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Upload video function
  const handleUploadVideo = async () => {
    if (!videoFile) {
      toast.error('Please select a video file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('https://bcom-backend.onrender.com/api/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setVideoUrl(response.data.videoUrl);
      setVideoFile(null);
      toast.success('Video uploaded successfully!');
      fetchAllVideos(); // Fetch videos again after upload
    } catch (error) {
      toast.error('Failed to upload video');
      console.error(error);
    }
  };

  // Update video function
  const handleUpdateVideo = async () => {
    if (!videoFile || !videoId) {
      toast.error('Please select a video file and provide video ID to update');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.put(`https://bcom-backend.onrender.com/api/video/${videoId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setVideoUrl(response.data.videoUrl);
      setVideoFile(null);
      setEditMode(false);
      setVideoId(null);
      toast.success('Video updated successfully!');
      fetchAllVideos(); // Fetch videos again after update
    } catch (error) {
      toast.error('Failed to update video');
      console.error(error);
    }
  };

  // Fetch all videos from the API
  const fetchAllVideos = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/video');
      setVideos(response.data || []); // Ensure the response is always an array
    } catch (error) {
      toast.error('Failed to fetch videos');
      console.error(error);
    }
  };

  // Fetch videos on component mount
  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {editMode ? 'Update Video' : 'Upload Video'}
        </h2>

        {/* Upload progress */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}>
              {uploadProgress}%
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Video upload input */}
          <label className="block text-gray-700 text-sm font-semibold">Select Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 p-2 border border-gray-300 rounded"
          />

          {/* Video ID input for updating video */}
          {editMode && (
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Video ID (For Update)</label>
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder="Enter video ID to update"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {/* Upload or update button */}
          <button
            onClick={editMode ? handleUpdateVideo : handleUploadVideo}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {editMode ? 'Update Video' : 'Upload Video'}
          </button>

          {/* Toggle between upload and update mode */}
          <div className="text-center mt-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-blue-500 underline hover:text-blue-700"
            >
              {editMode ? 'Switch to Upload Mode' : 'Switch to Update Mode'}
            </button>
          </div>

          {/* Show the uploaded video if available */}
          {videoUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-center text-gray-700 mb-2">Uploaded Video</h3>
              <video controls src={videoUrl} className="w-full rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Show all videos */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">All Videos</h2>
        {videos && videos.length > 0 ? ( // Add a check for videos being not undefined
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="rounded-lg shadow-lg">
                <video controls src={video.videoUrl} className="w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
