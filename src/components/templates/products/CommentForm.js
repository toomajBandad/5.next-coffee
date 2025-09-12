import React, { useState } from "react";
import Swal from "sweetalert2";

function CommentForm({ productID }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitComment(e) {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !body || !score) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
          username,
          email,
          body,
          score: Number(score),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Thanks for sharing your thoughts!",
        });

        // Reset form
        setUsername("");
        setEmail("");
        setBody("");
        setScore("");
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
    <form className="space-y-6" onSubmit={submitComment}>
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
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

      {/* Score */}
      <div>
        <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
          Rating (1–5)
        </label>
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
          id="score"
          name="score"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select a rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
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
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default CommentForm;