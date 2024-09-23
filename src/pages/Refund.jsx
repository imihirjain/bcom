import React from "react";
import Footer from "../components/Footer";

const Refund = () => {
  return (
    <>
      <div className="mt-12 px-4 py-8 max-w-4xl mx-auto font-indif">
        <h1 className="text-3xl font-bold text-center mb-6 mt-5 ">
          REFUND POLICY
        </h1>

        <section className="mb-6 font-gara">
          <p className="text-gray-700 mb-4 ">
            Offering a smooth and hassle-free experience to you is our top
            priority. If for some reason you are not completely satisfied with
            the product(s) you’ve received, we are happy to accept a size
            exchange. Please read the information on this page for guidance and
            instructions on exchanging your products.
          </p>
          <p className="text-gray-700">
            A product purchased from the website cannot be exchanged at a store
            whether owned and operated by us or by any of our retail partners.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 ">
            How can I determine if an item is eligible for return?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            We offer size exchanges, but there are exceptions:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 font-gara">
            <li>
              Items that arrive in a damaged condition, have missing
              items/parts, or are not in their original state are not eligible
              for exchange.
            </li>
            <li>
              Exchange requests initiated more than 2 days after delivery are
              not considered eligible.
            </li>
            <li>
              Products purchased during a sale, promotional offer, or with the
              use of discount codes cannot be exchanged.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Do you offer reverse pickups? Are there any additional charges for
            this service?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            We offer a reverse-pickup service for many, but not all, pin codes.
            If you choose to arrange for a reverse pick-up, a nominal reverse
            shipping fee of Rs. 450 per product will be charged.
          </p>
          <p className="text-gray-700 mb-2 font-gara">
            If your PIN code is not serviceable, you can return the product(s)
            by shipping them to us at our workshop location: Devdesignstudio,
            701/702-Sapphire Plaza, 7th Floor, Dadabhai Road, Vileparle(West),
            Mumbai 400056. In such cases, reverse shipping fees will not be
            charged.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What if I have received a damaged product?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            In the rare event that you have received a damaged or incorrect
            product, please submit a replacement request within 2 calendar days
            of receiving your order. Please provide relevant images to support
            your replacement request and mention your order number and name when
            reaching out to us.
          </p>
          <p className="text-gray-700 mb-2 font-gara">
            All replacement requests can be submitted by email at{" "}
            <a href="mailto:orders@deepikaarora.com" className="text-blue-600">
              orders@deepikaarora.com
            </a>{" "}
            or via WhatsApp at{" "}
            <span className="text-gray-700">______________________</span>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What is the process to exchange a product?
          </h2>
          <ul className="list-decimal list-inside text-gray-700 mb-4 font-gara">
            <li>
              Submit an exchange request by emailing us at{" "}
              <a
                href="mailto:orders@deepikaarora.com"
                className="text-blue-600"
              >
                orders@deepikaarora.com
              </a>{" "}
              or via WhatsApp at{" "}
              <span className="text-gray-700">_____________________</span>.
            </li>
            <li>
              If your location is eligible for reverse pick-up, we will arrange
              it and provide you with the shipping label to be pasted on the
              return parcel.
            </li>
            <li>
              If your pin code is not serviceable for reverse pick-up, please
              ship the parcel to our workshop location: Devdesignstudio,
              701/702-Sapphire Plaza, 7th Floor, Dadabhai Road, Vileparle(West),
              Mumbai 400056.
            </li>
            <li>
              Our operations team will inspect the product upon its arrival and
              approve the exchange request within 2-3 working days. Once an
              exchange is approved, we will inform you and initiate the process.
              In case of a replacement, it will be sent out within 3 working
              days.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What is the International Return/Exchange Policy?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            Please be advised that all international sales are final. We do not
            accept returns or exchanges for products shipped outside India. This
            policy is in place due to the complexities and costs associated with
            international shipping, customs, and taxes.
          </p>
          <p className="text-gray-700 mb-2 font-gara">
            Before making a purchase, we encourage customers to carefully review
            product details, sizing, and specifications. If you have any
            questions or concerns, feel free to contact our customer service
            team at <span className="text-gray-700">+91_________________</span>{" "}
            prior to placing your order.
          </p>
          <p className="text-gray-700 mb-2 font-gara">
            We do offer customization for size-related queries. You can connect
            with us on{" "}
            <span className="text-gray-700">+91____________________</span>.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-4">PLEASE NOTE:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 font-gara">
            <li>
              We only offer size exchanges for the same design. Refunds will not
              include shipping fees, COD charges, custom packaging, or similar
              expenses.
            </li>
            <li>
              During sales, we are unable to offer size exchanges due to limited
              availability. We recommend reviewing our size charts carefully
              before making a purchase.
            </li>
            <li>
              In the rare event of a credit note issuance, the exchanged
              merchandise should be of equal or greater value. If the new outfit
              is of lower value, no adjustments will be made for the price
              difference.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Refund;
