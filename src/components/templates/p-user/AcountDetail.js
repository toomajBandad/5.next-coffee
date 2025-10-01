"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AccountDetail() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Basic email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleUpdateUser = async () => {
    if (!username || !email || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT", // Use PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone }),
      });

      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: result.message,
        });

        await fetch("/api/auth/signout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        window.location.replace("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        const { username = "", email = "", phone = "" } = data?.data || {};
        setUsername(username);
        setEmail(email);
        setPhone(phone);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

return (
  <div className=" flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-6">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-600 mt-2 text-sm">Update your personal information below</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {[
          { label: "Username", value: username, setter: setUsername, type: "text", id: "username" },
          { label: "Email", value: email, setter: setEmail, type: "email", id: "email" },
          { label: "Phone", value: phone, setter: setPhone, type: "tel", id: "phone" },
        ].map(({ label, value, setter, type, id }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleUpdateUser}
        disabled={loading}
        className={`w-full cursor-pointer py-2 px-4 font-semibold rounded-md transition-colors duration-300 ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 border border-black"
        }`}
      >
        {loading ? "Updating..." : "Update User"}
      </button>
    </div>
  </div>
);
}

export default AccountDetail;
