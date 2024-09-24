import React from "react";
import size from "../assets/size.png";
import Footer from "../components/Footer";

const Size = () => {
  return (
    <>
      <div className="p-4 mt-24 font-indif">
        <h2 className="text-2xl font-bold mb-4">Size Chart</h2>
        <p className="mb-4 font-gara">
          To determine your perfect fit, we recommend measuring your bust,
          waist, and hips.
        </p>

        {/* Size Chart Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100 font-gara">
                <th className="border border-gray-300 px-2 py-1">DBV Size</th>
                <th className="border border-gray-300 px-2 py-1">US Size</th>
                <th className="border border-gray-300 px-2 py-1">UK Size</th>
                <th className="border border-gray-300 px-2 py-1">
                  European Size
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Bust (Inch)
                </th>
                <th className="border border-gray-300 px-2 py-1">Bust (CM)</th>
                <th className="border border-gray-300 px-2 py-1">
                  Waist (Inch)
                </th>
                <th className="border border-gray-300 px-2 py-1">Waist (CM)</th>
                <th className="border border-gray-300 px-2 py-1">Hip (Inch)</th>
                <th className="border border-gray-300 px-2 py-1">Hip (CM)</th>
                <th className="border border-gray-300 px-2 py-1">Leg (Inch)</th>
                <th className="border border-gray-300 px-2 py-1">Leg (CM)</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  size: "XS",
                  us: "2",
                  uk: "6",
                  eu: "32",
                  bustInch: "81",
                  bustCM: "32",
                  waistInch: "66",
                  waistCM: "26",
                  hipInch: "87",
                  hipCM: "34",
                  legInch: "101",
                  legCM: "104",
                },
                {
                  size: "S",
                  us: "4",
                  uk: "8",
                  eu: "36",
                  bustInch: "86",
                  bustCM: "34",
                  waistInch: "71",
                  waistCM: "28",
                  hipInch: "92",
                  hipCM: "36",
                  legInch: "104",
                  legCM: "105",
                },
                {
                  size: "M",
                  us: "6",
                  uk: "10",
                  eu: "38",
                  bustInch: "91",
                  bustCM: "36",
                  waistInch: "76",
                  waistCM: "30",
                  hipInch: "97",
                  hipCM: "38",
                  legInch: "105",
                  legCM: "107",
                },
                {
                  size: "L",
                  us: "8",
                  uk: "12",
                  eu: "40",
                  bustInch: "97",
                  bustCM: "38",
                  waistInch: "81",
                  waistCM: "32",
                  hipInch: "102",
                  hipCM: "40",
                  legInch: "107",
                  legCM: "107",
                },
                {
                  size: "XL",
                  us: "10",
                  uk: "14",
                  eu: "42",
                  bustInch: "102",
                  bustCM: "40",
                  waistInch: "86",
                  waistCM: "34",
                  hipInch: "107",
                  hipCM: "42",
                  legInch: "112",
                  legCM: "107",
                },
                {
                  size: "2XL",
                  us: "12",
                  uk: "16",
                  eu: "44",
                  bustInch: "107",
                  bustCM: "42",
                  waistInch: "91",
                  waistCM: "36",
                  hipInch: "112",
                  hipCM: "44",
                  legInch: "121",
                  legCM: "107",
                },
                {
                  size: "3XL",
                  us: "14",
                  uk: "18",
                  eu: "46",
                  bustInch: "111",
                  bustCM: "44",
                  waistInch: "96",
                  waistCM: "38",
                  hipInch: "121",
                  hipCM: "48",
                  legInch: "127",
                  legCM: "107",
                },
              ].map((item, index) => (
                <tr key={index} className="text-center font-gara">
                  <td className="border border-gray-300 px-2 py-1">
                    {item.size}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.us}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.uk}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.eu}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.bustInch}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.bustCM}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.waistInch}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.waistCM}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.hipInch}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.hipCM}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.legInch}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.legCM}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-4 font-gara">
          <strong>Note:</strong> These are standard measurements. Though the
          look and feel of each product are different, each silhouette will have
          unique measurements.
        </p>
        {/* Measurement Instructions */}
        <div className="flex flex-col md:flex-row mt-24 md:ml-10 items-center">
          <img
            src={size}
            alt="size chart"
            className="w-full md:w-1/2 mb-4 md:mb-0"
          />
          <div className="border-t border-gray-300 pt-4 w-full md:w-1/2 text-xl">
            <h3 className="text-xl font-bold mb-2">
              How to Take Your Measurements
            </h3>
            <ul className="list-decimal list-inside font-gara space-y-2">
              <li>
                <strong>Chest Circumference:</strong> The chest circumference is
                measured at the widest part of your chest and shoulder blades
                with your arms hanging down at your sides.
              </li>
              <li>
                <strong>Waist Circumference:</strong> The waist circumference is
                measured at the narrowest part of your waist. The measuring tape
                should be snug but not too tight.
              </li>
              <li>
                <strong>Hip Circumference:</strong> The hip circumference is
                measured at the widest part of your hips.
              </li>
              <li>
                <strong>Leg Length:</strong> The leg length is measured from the
                top of your thigh to the ankle.
              </li>
              <li>
                <strong>Length:</strong> The length is measured from the top of
                your shoulder seam to the hem.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Size;
