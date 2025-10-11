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

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">👥 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-0.5 py-2">Username</th>
              <th className="px-0.5 py-2">Email</th>
              <th className="px-0.5 py-2">Role</th>
              <th className="px-0.5 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-200">
                <td className="px-0.5 py-2">{user.username}</td>
                <td className="px-0.5 py-2">{user.email}</td>
                <td className="px-0.5 py-2">{user.role}</td>
                <td className="px-0.5 py-2 flex justify-center items-center flex-col gap-0.5 sm:flex-row sm:gap:2">
                  <button
                    className="bg-gray-800 text-white px-2 py-0.5 rounded hover:bg-gray-700"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-0.5 rounded hover:bg-red-500"
                    onClick={() => removeUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserEdit;
