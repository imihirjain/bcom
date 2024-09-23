import React from "react";
import Footer from "../components/Footer";

const Shipping = () => {
  return (
    <>
      <div className="mt-12 px-4 py-8 max-w-4xl mx-auto font-indif">
        <h1 className="text-3xl font-bold text-center mb-6 mt-5">
          SHIPPING POLICY
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            How long will it take for my order to reach me?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            After receiving an order, we place a confirmation call to you. All
            orders are shipped within 4-5 working days of confirming your order,
            and it typically takes another 2 to 10 working days for the order to
            reach you based on your location.
          </p>
          <p className="text-gray-700 mb-2 font-gara">
            However, if a product is out of stock for some reason, our team gets
            in touch immediately and you can choose to cancel the order in that
            case, without any charges.
          </p>
          <p className="text-gray-700 font-semibold mb-4">
            Typical Transit Time By Delivery Location:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4  font-gara">
            <li>Within Mumbai: 1 to 2 working days</li>
            <li>Major Cities: 3 to 5 working days</li>
            <li>Other cities: 3 to 10 working days</li>
          </ul>
          <p className="text-gray-700 font-gara">
            <strong>Note:</strong> The delivery timelines above are an
            estimation only. Since we rely on our courier partners for delivery,
            this can vary due to factors that are outside our control.
          </p>
        </section>

        <section className="mb-6">
          <p className="text-gray-700 font-gara">
            Once your order has been shipped, you will receive an email
            notification with the courier and tracking details so that you can
            track your order online.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Do I have to pay for shipping?
          </h2>
          <p className="text-gray-700 mb-2 font-gara">
            We offer free shipping across India for all prepaid orders. For cash
            on delivery orders, a nominal convenience fee of Rs. 450 will be
            added during checkout. This convenience fee is non-refundable.
          </p>
        </section>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Key Points Summary:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 font-gara">
            <li>Orders shipped within 4-5 working days after confirmation.</li>
            <li>Delivery takes 2 to 10 working days depending on location.</li>
            <li>Free shipping for all prepaid orders across India.</li>
            <li>Rs. 450 convenience fee for COD orders (non-refundable).</li>
            <li>Email notification sent with tracking details once shipped.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
