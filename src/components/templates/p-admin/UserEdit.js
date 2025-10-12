"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function UserEdit({ users }) {
  const router = useRouter();

  async function editUser(user) {
    try {
      const result = await Swal.fire({
        title: `<span class="text-gray-800 text-xl font-semibold">Edit User</span>`,
        html: `
        <div class="flex flex-col gap-1 text-sm text-start">
          <div>
            <label for="swal-input1" class="font-bold">Username:</label>
            <input id="swal-input1" class="swal2-input w-full rounded border border-gray-300 my-0" value="${
              user.username
            }">
          </div>
          <div>
            <label for="swal-input2" class="font-bold">Email:</label>
            <input id="swal-input2" class="swal2-input w-full rounded border border-gray-300 my-0" value="${
              user.email
            }">
          </div>
          <div>
            <label for="swal-input4" class="font-bold">Role:</label>
            <select id="swal-input4" class="swal2-input rounded border border-gray-300 my-0">
              <option value="USER" ${
                user.role === "USER" ? "selected" : ""
              }>USER</option>
              <option value="ADMIN" ${
                user.role === "ADMIN" ? "selected" : ""
              }>ADMIN</option>
            </select>
          </div>
          <div>
            <label for="swal-input5" class="font-bold">Phone:</label>
            <input id="swal-input5" class="swal2-input w-full rounded border border-gray-300 my-0" value="${
              user.phone
            }">
          </div>
        </div>
      `,
        customClass: {
          popup: "bg-white rounded-lg shadow-md p-6",
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        focusConfirm: false,
        preConfirm: () => {
          return {
            username: document.getElementById("swal-input1").value,
            email: document.getElementById("swal-input2").value,
            role: document.getElementById("swal-input4").value,
            phone: document.getElementById("swal-input5").value,
          };
        },
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
      await Swal.fire("Error", "Something went wrong.", "error");
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
