import React from "react";

function CommentForm() {
  function submitComment(e) {
    e.preventDefault();
    console.log("sending to server");
  }
  return (
    <form className="space-y-6" onSubmit={submitComment}>
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="you@example.com"
        />
      </div>

      {/* Score */}
      <div>
        <label
          htmlFor="score"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating (1–5)
        </label>
        <select
          id="score"
          name="score"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comment
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200"
      >
        Submit Review
      </button>
    </form>
  );
}

export default CommentForm;
