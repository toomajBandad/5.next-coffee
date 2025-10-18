"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DiscountCodeInput from "@/components/modules/discountCodeInput/DiscountCodeInput";

function MainCheckout({ user }) {
  const [cart, setCart] = useState([]);
  const [userAddress, setUserAddress] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const [saveAddress, setSaveAddress] = useState(false); 

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (user) {
      setUserAddress(user.address || "");
    }
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * (discountPercent / 100);
  const totalPrice = Math.max(0, subtotal - discountAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "🧾 Confirm Your Order",
      html: `
      <div style="text-align:left; font-size:14px;">
        <p><strong>Name:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${userAddress}</p>
        <p><strong>Total:</strong> $${totalPrice.toLocaleString()}</p>
      </div>
    `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Place Order",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    // ✅ Save address if checkbox is checked
    if (saveAddress) {
      try {
        await fetch(`/api/user/addressUpdate/${user._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: userAddress }),
        });
      } catch (err) {
        console.error("Failed to save address:", err);
      }
    }

    // ✅ Transform cart to match required format
    const items = cart.map((item) => ({
      productId: item.productID,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items,
          total: totalPrice,
          status: "Pending",
          address: userAddress,
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "🎉 Order Placed!",
          text: "Thank you for your purchase.",
          icon: "success",
        });
        localStorage.removeItem("cart");
        setCart([]);
      } else {
        Swal.fire("❌ Error", data.message || "Something went wrong.", "error");
      }
    } catch (err) {
      Swal.fire("❌ Server Error", "Please try again later.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        🛒 Secure Checkout
      </h2>

      <div className="mb-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700">
        <p className="mb-1">
          <span className="font-semibold text-gray-600">👤 Name:</span>{" "}
          {user.username}
        </p>
        <p>
          <span className="font-semibold text-gray-600">📧 Email:</span>{" "}
          {user.email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            📦 Shipping Address
          </label>
          <textarea
            name="address"
            placeholder="Enter your full delivery address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            required
          />
          {/* ✅ NEW CHECKBOX */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="saveAddress"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
              className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="saveAddress" className="text-sm text-gray-700">
              💾 Save this address to my profile
            </label>
          </div>
        </div>

        <DiscountCodeInput
          onApply={(percent, code) => {
            setDiscountPercent(percent);
            setDiscountCode(code);
            setDiscountApplied(true);
          }}
          disabled={discountApplied}
        />

        {/* Order Summary */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            🧾 Order Summary
          </h3>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li
                    key={item.productID}
                    className="py-3 flex justify-between items-center transition hover:bg-gray-50"
                  >
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold text-lg mt-6">
                Subtotal: ${subtotal.toLocaleString()}
              </div>
              {discountPercent > 0 && (
                <div className="text-right text-green-600 font-semibold">
                  Discount ({discountPercent}%): −$
                  {discountAmount.toLocaleString()}
                </div>
              )}
              <div className="text-right font-bold text-2xl mt-2 text-gray-800">
                Total: ${totalPrice.toLocaleString()}
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
        >
          ✅ Confirm & Pay
        </button>
      </form>
    </div>
  );
}

export default MainCheckout;
