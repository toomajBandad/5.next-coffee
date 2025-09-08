"use client";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "@/utils/auth";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  async function loginRegisterHandler(event) {
    event.preventDefault();

    if (isLogin) {
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);

      if (!isValidEmail || !isValidPassword) {
        Swal.fire({
          title: "Error",
          text: "Please fill in valid data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        return;
      }

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        let data;
        try {
          data = await response.json();
        } catch {
          data = { message: "Unexpected server response." };
        }

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Login successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setEmail("");
          setPassword("");
          setIsLogin(true);
          router.push("/dashboard");
        } else {
          Swal.fire({
            title: "Error",
            text: data.message || "Login failed.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Network Error",
          text: "Unable to connect to the server.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } else {
      const isValidUsername = validateUsername(username);
      const isValidPhone = validatePhone(phone);
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);

      if (
        !isValidUsername ||
        !isValidPhone ||
        !isValidEmail ||
        !isValidPassword
      ) {
        Swal.fire({
          title: "Error",
          text: "Please fill in valid data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        return;
      }

      const newUser = { username, phone, email, password };

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        let data;
        try {
          data = await response.json();
        } catch {
          data = { message: "Unexpected server response." };
        }

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Registration completed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setUsername("");
          setPhone("");
          setEmail("");
          setPassword("");
          setIsLogin(true);
        } else {
          Swal.fire({
            title: "Error",
            text: data.message || "Registration failed.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Network Error",
          text: "Unable to connect to the server.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className="space-y-4" onSubmit={loginRegisterHandler}>
          {!isLogin && (
            <>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-black underline hover:text-gray-700 transition"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
