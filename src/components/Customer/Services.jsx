import React from 'react'
import { FaTruck, FaUndo, FaTags, FaBoxes } from "react-icons/fa";

const Services = () => {
  return (

    <section className="max-w-8xl m-5 px-4 py-12">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Best Prices */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 border-gray hover:border-green3">

          <div className="flex justify-center mb-4">
            <FaTags className="text-4xl text-green3" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Best Prices
          </h2>

          <p className="text-gray-600 text-sm">
            Get high-quality products at the most affordable prices.
          </p>

        </div>

        {/* Fast Delivery */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 border-white hover:border-green3">

          <div className="flex justify-center mb-4">
            <FaTruck className="text-4xl text-green3" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Fast Delivery
          </h2>

          <p className="text-gray-600 text-sm">
            Quick and reliable delivery right to your doorstep.
          </p>

        </div>

        {/* Wide Assortment */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 border-white hover:border-green3">

          <div className="flex justify-center mb-4">
            <FaBoxes className="text-4xl text-green3" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Wide Assortment
          </h2>

          <p className="text-gray-600 text-sm">
            Explore a wide variety of products in different categories.
          </p>

        </div>

        {/* Easy Returns */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-2xl  transition duration-300 border-white hover:border-green3">

          <div className="flex justify-center mb-4">
            <FaUndo className="text-4xl text-green3" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Easy Returns
          </h2>

          <p className="text-gray-600 text-sm">
            Hassle-free returns and smooth refund process.
          </p>

        </div>

      </div>

    </section>
  )
}

export default Services