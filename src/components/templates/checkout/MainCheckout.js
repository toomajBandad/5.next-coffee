"use client";
import React, { useEffect, useState } from "react";

function MainCheckout() {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const totalPrice = Math.max(0, subtotal - discountAmount);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleDiscountApply = async () => {
    try {
      const res = await fetch("/api/discount", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode }),
      });

      const result = await res.json();
      if (result.success) {
        setDiscountPercent(result.data.percent); // percent from server
        setDiscountMessage(`✅ ${result.message} (${result.data.percent}% off)`);
      } else {
        setDiscountPercent(0);
        setDiscountMessage(`❌ ${result.message}`);
      }
    } catch (err) {
      setDiscountMessage("❌ Server error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", {
      userInfo,
      cart,
      discountCode,
      discountPercent,
      totalPrice,
    });
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🧾 Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userInfo.name}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userInfo.email}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={userInfo.address}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        />

        {/* Discount Ticket */}
        <div className="my-4">
          <label className="block mb-2 font-medium">Discount Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleDiscountApply}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
          {discountMessage && (
            <p className="mt-2 text-sm text-gray-700">{discountMessage}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.productID} className="py-2 flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg mt-4">
            Subtotal: ${subtotal.toLocaleString()}
          </div>
          {discountPercent > 0 && (
            <div className="text-right text-green-600 font-semibold">
              Discount ({discountPercent}%): −${discountAmount.toLocaleString()}
            </div>
          )}
          <div className="text-right font-bold text-xl mt-2">
            Total: ${totalPrice.toLocaleString()}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
        >
          Confirm & Pay
        </button>
      </form>
    </div>
  );
}

export default MainCheckout;