import React, { useState } from "react";
import Footer from "../components/Footer";

const Career = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    department: "",
    jobType: [],
    resume: null,
    portfolio: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      jobType: checked
        ? [...prevData.jobType, value]
        : prevData.jobType.filter((type) => type !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    console.log(formData);
  };

  return (
    <div className="mt-24 text-center font-indif font-bold">
      <h1 className="text-2xl">Career</h1>
      <p className="text-lg mb-8 font-gara">Want to join Dev and Viv team</p>

      <form
        className="w-full max-w-lg mx-auto font-gara bg-gray-100 p-6 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-left text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-left text-gray-700">
            Contact No.
          </label>
          <input
            type="tel"
            name="contact"
            id="contact"
            className="w-full p-2 border rounded-md"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-left text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-left text-gray-700">
            Department
          </label>
          <select
            name="department"
            id="department"
            className="w-full p-2 border rounded-md"
            value={formData.department}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            {/* Add other department options here */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700">Job Type</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              name="jobType"
              value="Full Time Job"
              onChange={handleJobTypeChange}
            />
            <label className="ml-2">Full Time Job</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="jobType"
              value="Internship"
              onChange={handleJobTypeChange}
            />
            <label className="ml-2">Internship</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="resume" className="block text-left text-gray-700">
            Attach Resume
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            className="w-full p-2 border rounded-md"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="portfolio" className="block text-left text-gray-700">
            Portfolio
          </label>
          <input
            type="file"
            name="portfolio"
            id="portfolio"
            className="w-full p-2 border rounded-md"
            onChange={handleFileChange}
            multiple
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Career;
