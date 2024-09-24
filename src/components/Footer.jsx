import React from "react";
import {
  FaEnvelope,
  FaFontAwesome,
  FaPhone,
  FaVoicemail,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-[100px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm sm:text-base">
        {/* Customer Care Section */}
        <div className="text-left">
          <h4 className="font-indif font-bold text-lg sm:text-2xl">
            CUSTOMER CARE
          </h4>
          <p className="mt-2 font-gara font-medium text-base sm:text-xl">
            Our online customer care team is available Monday through Saturday,
            10AM – 6PM IST. We are closed on weekends and national holidays.
            Please contact us, we would be happy to assist you.
          </p>
          <p className="mt-2 flex items-center gap-2">
            <FaPhone className="mt-1" />{" "}
            <a
              href="tel:+918700033744"
              className="text-gray-700 font-indif font-bold text-base sm:text-lg"
            >
              +91 899-9999-999
            </a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope />{" "}
            <a
              href="mailto:info@xyz.com"
              className="text-gray-700 font-indif font-bold text-base sm:text-lg"
            >
              info@xyz.com
            </a>
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="text-left">
          <h4 className="font-indif font-bold text-lg sm:text-2xl">
            QUICK LINKS
          </h4>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="/about-us"
                className="text-gray-700 hover:underline font-gara font-semibold"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/shipping-policy"
                className="text-gray-700 hover:underline font-gara font-semibold"
              >
                Shipping Policy
              </a>
            </li>
            <li>
              <a
                href="/cancellation-returns"
                className="text-gray-700 hover:underline font-gara font-semibold"
              >
                Cancellation & Returns
              </a>
            </li>
            <li>
              <a
                href="/terms-conditions"
                className="text-gray-700 hover:underline font-gara font-semibold"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-700 hover:underline font-gara font-semibold"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="text-left">
          <h4 className="font-indif font-bold text-lg sm:text-2xl">
            NEWSLETTER
          </h4>
          <p className="mt-2 font-gara font-semibold">
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter email"
              className="px-4 py-2 border font-indif font-semibold border-gray-300 w-full mb-2"
            />
            <button className="bg-gray-800 text-white px-4 py-2 w-full font-indif font-semibold">
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-8 text-center text-sm sm:text-lg border-t pt-4 text-gray-500 font-indif font-semibold">
        <p>© 2024 xyz.com. Managed by Growify Digital</p>
        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-4">
          <li>
            <a href="/about-us" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/cancellation-returns" className="hover:underline">
              Cancellation & Returns
            </a>
          </li>
          <li>
            <a href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/carrer" className="hover:underline">
              Career
            </a>
          </li>
          <li>
            <a href="/shipping-policy" className="hover:underline">
              Shipping Policy
            </a>
          </li>
          <li>
            <a href="/refund-policy" className="hover:underline">
              Refund Policy
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:underline">
              FAQ's
            </a>
          </li>
          <li>
            <a href="/size" className="hover:underline">
              Size
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
