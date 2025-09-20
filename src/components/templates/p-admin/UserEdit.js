"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UserEdit({ users }) {

  const router = useRouter();

  async function editUser(user) {
    try {
      const result = await Swal.fire({
        title: `Edit ${user.username}`,
        html:
          `<input id="swal-input1" class="swal2-input" placeholder="Username" value="${user.username}">` +
          `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
          `<input id="swal-input3" class="swal2-input" placeholder="Phone" value="${user.phone}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => ({
          username: document.getElementById("swal-input1").value,
          email: document.getElementById("swal-input2").value,
          phone: document.getElementById("swal-input3").value,
          role: user.role,
        }),
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/editUsers/${user._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.value),
        });

        if (res.ok) {
          await Swal.fire("Saved!", "User updated successfully.", "success");
         router.refresh();
        } else {
          await Swal.fire("Error", "Failed to update user.", "error");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function removeUser(user) {
    try {
      const result = await Swal.fire({
        title: `Remove ${user.username}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/editUsers/${user._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire("Removed!", "User deleted successfully.", "success");
          router.refresh();
        } else {
          await Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }

  async function banUser(user) {
    try {
      const result = await Swal.fire({
        title: `Ban ${user.username}?`,
        text: "User will be restricted from access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ban",
      });

      if (result.isConfirmed) {
        const res = await fetch(`/api/user/editUsers/${user._id}`, {
          method: "POST",
        });

        if (res.ok) {
          await Swal.fire("Banned!", "User has been banned.", "success");
          // fetchUsers();
        } else {
          await Swal.fire("Error", "Failed to ban user.", "error");
        }
      }
    } catch (error) {
      console.error("Error banning user:", error);
    }
  }

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
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => removeUser(user)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                    onClick={() => banUser(user)}
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