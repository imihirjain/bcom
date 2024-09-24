import React, { useState } from "react";
import Footer from "../components/Footer";

const Career = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    department: "",
    jobType: [],
    resumeLink: "",
    portfolioLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

    const subject = encodeURIComponent("New Career Application");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n
       Contact: ${formData.contact}\n
       Email: ${formData.email}\n
       Department: ${formData.department}\n
       Job Type: ${formData.jobType.join(", ")}\n
       Resume Link: ${formData.resumeLink}\n
       Portfolio Link: ${formData.portfolioLink}`
    );

    // Construct the mailto link
    const mailtoLink = `mailto:jmanav251@gmail.com?subject=${subject}&body=${body}`;

    // Open the mail client with the prefilled data
    window.location.href = mailtoLink;
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
          <label htmlFor="resumeLink" className="block text-left text-gray-700">
            Resume Link (Google Drive or other link)
          </label>
          <input
            type="url"
            name="resumeLink"
            id="resumeLink"
            className="w-full p-2 border rounded-md"
            value={formData.resumeLink}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="portfolioLink"
            className="block text-left text-gray-700"
          >
            Portfolio Link (Google Drive or other link)
          </label>
          <input
            type="url"
            name="portfolioLink"
            id="portfolioLink"
            className="w-full p-2 border rounded-md"
            value={formData.portfolioLink}
            onChange={handleInputChange}
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
