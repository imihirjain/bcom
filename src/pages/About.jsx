import React from "react";
import logo from "../assets/3.png";
import { FaGlobe, FaTruck } from "react-icons/fa";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-24 font-indif ">
        <h1 className="uppercase font-extrabold text-2xl">Founder</h1>
        <h2 className="mt-5 text-md font-bold font-gara">Dev And Viv</h2>
        <img src={logo} alt="" className="w-72 h-auto mt-10" />{" "}
        {/* Adjust width and height */}
        <h2 className="mt-10 text-xl font-bold">Founder's Note</h2>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mt-5  mx-auto flex flex-col items-start font-gara font-semibold">
        <p className="mt-5">
          The logo of our brand is a Khanda Sword which represents Hukam meaning
          the divine will or Shakti. Chandi Di Vaar (The Ballad of Chandi) is a
          philosophical and spiritual composition written by Guru Gobind Singh
          Maharaj in which he explains that the divine will always have a
          negative and positive aspect which can be attributed to the
          double-edged sword called Khanda. The creator first made this Hukam
          and then the whole universe was manifested.
        </p>

        <p className="mt-5">
          As I connect with the light within, my creative process is guided by
          the eternal love that becomes a lifelong muse. My prayer for everyone
          who wears our clothes is to realize the divine will and flow into the
          ocean of abundance. Guru Nanak's eternal message of oneness has become
          the essence of my being as I bring to you Divinity through Design.
        </p>
      </div>

      <h2 className="text-center text-xl font-indif font-bold mt-10">
        About the Designer
      </h2>
      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mt-5 mx-auto flex flex-col items-start font-gara font-semibold">
        <p className="mt-5">
          The logo of our brand is a Khanda Sword which represents Hukam meaning
          the divine will or Shakti. Chandi Di Vaar (The Ballad of Chandi) is a
          philosophical and spiritual composition written by Guru Gobind Singh
          Maharaj in which he explains that the divine will always have a
          negative and positive aspect which can be attributed to the
          double-edged sword called Khanda. The creator first made this Hukam
          and then the whole universe was manifested.
        </p>

        <p className="mt-5">
          As I connect with the light within, my creative process is guided by
          the eternal love that becomes a lifelong muse. My prayer for everyone
          who wears our clothes is to realize the divine will and flow into the
          ocean of abundance. Guru Nanak's eternal message of oneness has become
          the essence of my being as I bring to you Divinity through Design.
        </p>

        <div className="flex justify-around mt-10 max-w-lg mx-auto gap-10">
          {/* Icon 1 with Text */}
          <div className="flex flex-col items-center">
            <FaTruck className="text-3xl text-gray-800" /> {/* Shipping Icon */}
            <p className="mt-2 text-gray-700 font-indif font-bold text-xl">
              Free Shipping
            </p>
          </div>
          {/* Icon 2 with Text */}
          <div className="flex flex-col items-center">
            <FaGlobe className="text-3xl text-gray-800" />{" "}
            {/* Worldwide Delivery Icon */}
            <p className="mt-2 text-gray-700 font-indif font-bold text-xl">
              Worldwide Delivery
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
