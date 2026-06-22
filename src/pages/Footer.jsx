import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (

    <footer className="bg-gray text-black mt-16">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <h1 className="text-3xl font-bold text-green3 mb-4">
            SMV-ECOM
          </h1>

          <p className="text-gray-400 text-sm leading-6">
            Your trusted ecommerce store for quality products,
            fast delivery, and the best shopping experience.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">

            <div className="bg-green3 p-3 rounded-full hover:bg-green2 text-white transition cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-green3 p-3 rounded-full hover:bg-green2 text-white transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="bg-green3 p-3 rounded-full hover:bg-green2 text-white transition cursor-pointer">
              <FaTwitter />
            </div>

            <div className="bg-green3 p-3 rounded-full hover:bg-green2 text-white transition cursor-pointer">
              <FaLinkedinIn />
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green3">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400 text-sm ">

            <li className="hover:text-green-500 cursor-pointer transition ">
              Home
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Shop
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Categories
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Contact
            </li>

          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green">
            Customer Service
          </h2>

          <ul className="space-y-3 text-gray-400 text-sm">

            <li className="hover:text-green-500 cursor-pointer transition">
              My Account
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Order Tracking
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Wishlist
            </li>

            <li className="hover:text-green-500 cursor-pointer transition">
              Help Center
            </li>

          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green3">
            Newsletter
          </h2>

          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get latest updates and offers.
          </p>

          <div className="flex">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-lg outline-none text-black"
            />

            <button className="bg-green3 hover:bg-green2 px-5 rounded-r-lg transition">
              Subscribe
            </button>

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © 2026 SMV-ECOM. All Rights Reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Built with ❤️ for Modern Ecommerce
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
