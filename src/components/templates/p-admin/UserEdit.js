"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UserEdit({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

const handleAction = async (action, user) => {
  let result;

  try {
    if (action === "edit") {
      result = await Swal.fire({
        title: `Edit ${user.username}`,
        html:
          `<input id="swal-input1" class="swal2-input" placeholder="Username" value="${user.username}">` +
          `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          return {
            username: document.getElementById("swal-input1").value,
            email: document.getElementById("swal-input2").value,
          };
        },
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/${user._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "User updated successfully.", "success");
          fetchUsers();
        } else {
          await Swal.fire("Error", "Failed to update user.", "error");
        }
      }
    }

    if (action === "remove") {
      result = await Swal.fire({
        title: `Remove ${user.username}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/${user._id}`, { method: "DELETE" });

        if (res.ok) {
          await Swal.fire("Removed!", "User deleted successfully.", "success");
          fetchUsers();
        } else {
          await Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    }

    if (action === "ban") {
      result = await Swal.fire({
        title: `Ban ${user.username}?`,
        text: "User will be restricted from access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ban",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/${user._id}/ban`, { method: "POST" });

        if (res.ok) {
          await Swal.fire("Banned!", "User has been banned.", "success");
          fetchUsers();
        } else {
          await Swal.fire("Error", "Failed to ban user.", "error");
        }
      }
    }
  } catch (error) {
    await Swal.fire("Error", "Something went wrong.", "error");
  }
};

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">👥 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => handleAction("edit", user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => handleAction("remove", user)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                    onClick={() => handleAction("ban", user)}
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserEdit;