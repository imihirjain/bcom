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
    console.log(formData); // Handle form submission here
  };

  return (
    <div className="container mx-auto p-5 mt-24 ">
      <h1 className="text-center text-3xl font-bold font-corm mb-8 uppercase">
        Contact
      </h1>

      <div className="flex justify-center items-center font-corm font-semibold">
        <div className="contact-details text-start text-lg mb-10">
          <p>
            <strong className="font-bold">For bridal appointments :</strong>{" "}
            <a
              href="mailto:info@angadsinghofficial.com"
              className="text-blue-500"
            >
              info@xyz.com
            </a>{" "}
            or WhatsApp us at +91-9999999999. We will get back to you within 24
            hours.
          </p>
          <p className="mt-6">
            <strong>Head Office Address</strong>
          </p>
          <p>
            702-sapphire plaza Dadabhai Road Vile parle (w) Mumbai 400056
            Opp. CNM school
          </p>
          <p className="mt-6">
            <strong>Phone</strong>
          </p>
          <p>For Online Sales: +91 9999999999</p>
          <p>India (Head Office): +91 9999999999</p>
          <p className="mt-6">
            <strong>Email Address</strong>
          </p>
          <p>
            General:{" "}
            <a
              href="mailto:info@angadsinghofficial.com"
              className="text-blue-500"
            >
              info@xyz.com
            </a>
          </p>
        </div>
      </div>
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
            className="px-8 py-3 bg-[#cdac99] text-white rounded-md hover:bg-[#b39584] transition duration-300"
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
