"use client";
import React, { useState } from "react";

function DiscountCodeInput({ onApply, disabled }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (applied || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/discount", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await res.json();
      if (result.success) {
        setPercent(result.data.percent);
        setMessage(`✅ ${result.message} (${result.data.percent}% off)`);
        setApplied(true);
        onApply(result.data.percent, code);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <label className="block mb-2 font-medium">Discount Code</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 p-2 border rounded"
          disabled={applied || disabled}
        />
        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={applied || loading || disabled}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default DiscountCodeInput;