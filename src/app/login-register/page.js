"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "@/utils/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleForm = () => setIsLogin((prev) => !prev);

  const onSubmit = async (data) => {
    const { email, password, username, phone } = data;
    setLoading(true);

    if (isLogin) {
      if (!validateEmail(email) || !validatePassword(password)) {
        Swal.fire({
          title: "Error",
          text: "Please fill in valid data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Login successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            reset();
            setIsLogin(true);
            location.replace("/");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: result.message || "Login failed.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch {
        Swal.fire({
          title: "Network Error",
          text: "Unable to connect to the server.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      } finally {
        setLoading(false);
      }
    } else {
      if (
        !validateUsername(username) ||
        !validatePhone(phone) ||
        !validateEmail(email) ||
        !validatePassword(password)
      ) {
        Swal.fire({
          title: "Error",
          text: "Please fill in valid data. Register failed.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, phone, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Registration completed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          reset();
          setIsLogin(true);
        } else {
          Swal.fire({
            title: "Error",
            text: result.message || "Registration failed.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch {
        Swal.fire({
          title: "Network Error",
          text: "Unable to connect to the server.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg px-8 py-10 my-30 md:my-50">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form
          className="space-y-4 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!isLogin && (
            <>
              <div>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black mb-0"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">Username is required</p>
                )}
              </div>

              <div>
                {" "}
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black mb-0"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">Phone is required</p>
                )}
              </div>
            </>
          )}

          <div>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-600 hover:text-black cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEyeSlash className="h-5 w-5" />
                ) : (
                  <FaRegEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded transition mb-0 ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-black hover:bg-gray-900 cursor-pointer"
            } text-white`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-2 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-black underline hover:text-gray-700 transition cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
