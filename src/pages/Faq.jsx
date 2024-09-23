import React from "react";
import Footer from "../components/Footer";

const Faq = () => {
  return (
    <>
      <div className="mt-12 px-4 py-8 max-w-4xl mx-auto font-indif ">
        <h1 className="text-3xl font-bold text-center mb-6 mt-5">FAQ'S</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1) Are colour customisations possible?
          </h2>
          <p className="text-gray-700 mb-4 font-gara">
            Yes, they are. Please get in touch with us for customisation queries
            at +91 <span className="text-gray-700">___________________</span>.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2) Can the fabric be changed?
          </h2>
          <p className="text-gray-700 mb-4 font-gara">
            No. Fabric changes are not possible.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3) Can sizes be customised?
          </h2>
          <p className="text-gray-700 mb-4 font-gara">
            Yes, they can! Please contact us for custom orders at +91{" "}
            <span className="text-gray-700">___________________</span>.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4) What is the delivery timeline like?
          </h2>
          <p className="text-gray-700 mb-4 font-gara">
            If the piece is in stock, it takes 3 working days, otherwise it's a
            7-day delivery process.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5) Do you have a store in Mumbai?
          </h2>
          <p className="text-gray-700 mb-4 font-gara">
            Yes, we do. We’re based in Vile Parle(West), Mumbai. Please get in
            touch with us if you’d like to visit. Our address is:
          </p>
          <p className="text-gray-700 font-gara">
            Devdesignstudio, 701/702-Sapphire Plaza, 7th Floor, Dadabhai Road,
            Vileparle(West), Mumbai 400056.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
