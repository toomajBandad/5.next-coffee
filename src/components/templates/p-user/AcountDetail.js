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
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-black rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Account Settings
        </h1>

        {[
          {
            label: "Username",
            value: username,
            setter: setUsername,
            type: "text",
            id: "username",
          },
          {
            label: "Email",
            value: email,
            setter: setEmail,
            type: "email",
            id: "email",
          },
          {
            label: "Phone",
            value: phone,
            setter: setPhone,
            type: "tel",
            id: "phone",
          },
        ].map(({ label, value, setter, type, id }) => (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block mb-1 font-medium">
              {label}
            </label>
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              autoComplete="off"
              className="w-full px-3 py-2 border border-black rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}

        <button
          onClick={handleUpdateUser}
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded border border-black transition-colors duration-300 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </div>
    </div>
  );
}

export default AccountDetail;
