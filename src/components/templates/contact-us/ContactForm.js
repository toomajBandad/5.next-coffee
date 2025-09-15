"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitComment(e) {
    e.preventDefault();

    if (!name || !email || !contactNumber || !company || !body) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contactNumber,
          company,
          body,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Thanks for sharing your thoughts!",
        });

        setName("");
        setEmail("");
        setContactNumber("");
        setCompany("");
        setBody("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to reach the server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Get in Touch
      </h2>

      <form className="space-y-6" onSubmit={submitComment}>
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Row 2: Contact Number & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              type="text"
              id="contactNumber"
              name="contactNumber"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g. +34 600 123 456"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              id="company"
              name="company"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your company name"
            />
          </div>
        </div>

        {/* Row 3: Comment Body */}
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            id="body"
            name="body"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded-md transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;