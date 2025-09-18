"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AdminSendTicket() {
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubdepartments] = useState([]);
  const [filteredSubdepartments, setFilteredSubdepartments] = useState([]);

  const [departmentId, setDepartmentId] = useState("");
  const [subdepartment, setSubdepartment] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(data.departments || []);
    };
    const getSubDepartments = async () => {
      const res = await fetch("/api/subDepartments");
      const data = await res.json();
      setSubdepartments(data.subDepartments || []);
    };
    getDepartments();
    getSubDepartments();
  }, []);

  useEffect(() => {
    const selectedSubDeter = subdepartments.filter(
      (sub) => sub.department === departmentId
    );
    setFilteredSubdepartments(selectedSubDeter);
  }, [departmentId, subdepartments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      department: departmentId,
      subDepartment: subdepartment,
      title,
      body,
      priority,
    };
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });
    const result = await res.json();
    if (result.success) {
      Swal.fire("Success", "Ticket submitted successfully!", "success");
      // Reset form
      setDepartmentId("");
      setSubdepartment("");
      setTitle("");
      setBody("");
      setPriority(1);
    } else {
      Swal.fire("Error", result.message || "Failed to submit ticket", "error");
    }
    console.log(ticketData);
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Send Ticket to Host</h2>

      {/* Department Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.title}
            </option>
          ))}
        </select>
      </div>

      {/* Subdepartment Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subdepartment
        </label>
        <select
          value={subdepartment}
          onChange={(e) => setSubdepartment(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select subdepartment</option>
          {filteredSubdepartments.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.title}
            </option>
          ))}
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Body Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Ticket
      </button>
    </form>
  );
}

export default AdminSendTicket;
