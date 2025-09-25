import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-black text-white border-t-1 border-white px-6 pt-20 pb-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Next Coffee</h2>
          <p className="text-sm text-gray-400">
            Crafting digital experiences with elegance and precision.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
            </a>
             <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTelegramPlane />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
                <AiFillInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Toomaj Bandad. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
