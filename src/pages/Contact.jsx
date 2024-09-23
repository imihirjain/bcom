import React, { useState } from "react";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // Create the mailto link with form data
    const mailtoLink = `mailto:info@xyz.com?subject=New Contact Form Submission&body=Name: ${encodeURIComponent(
      name
    )}%0D%0AEmail: ${encodeURIComponent(
      email
    )}%0D%0APhone: ${encodeURIComponent(
      phone
    )}%0D%0AMessage: ${encodeURIComponent(message)}`;

    // Open the mail client with the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto p-5 mt-24 ">
      <h1 className="text-center text-3xl font-bold font-indif mb-8 uppercase">
        Contact
      </h1>

      <form className="max-w-2xl mx-auto mb-8" onSubmit={handleSubmit}>
        <div className="flex gap-5 mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-5 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full mb-5 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
        ></textarea>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-[#cdac99] font-gara text-white rounded-md hover:bg-[#b39584] transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
      <Footer className="mt-8" />
    </div>
  );
};

export default Contact;
