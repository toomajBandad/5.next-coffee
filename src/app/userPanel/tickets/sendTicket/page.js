"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function SendTicketForm() {
  const router = useRouter();

  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubdepartments] = useState([]);
  const [filteredSubdepartments, setFilteredSubdepartments] = useState([]);

  const [departmentId, setDepartmentId] = useState("");
  const [subdepartment, setSubdepartment] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data || [];
    };

    (async () => {
      const deptData = await fetchData("/api/departments");
      const subDeptData = await fetchData("/api/subDepartments");
      setDepartments(deptData.departments || []);
      setSubdepartments(subDeptData.subDepartments || []);
    })();
  }, []);

  useEffect(() => {
    const filtered = subdepartments.filter(
      (sub) => sub.department === departmentId
    );
    setFilteredSubdepartments(filtered);
  }, [departmentId, subdepartments]);

  const validateForm = () => {
    const errors = [];
    if (!departmentId) errors.push("Department is required.");
    if (!subdepartment) errors.push("Subdepartment is required.");
    if (!title.trim()) errors.push("Title is required.");
    if (!body.trim()) errors.push("Body is required.");
    if (![1, 2, 3].includes(priority)) errors.push("Priority must be selected.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const errors = validateForm();
    if (errors.length > 0) {
      Swal.fire("Validation Error", errors.join("<br>"), "error");
      return;
    }

    setLoading(true);
    const ticketData = {
      department: departmentId,
      subDepartment: subdepartment,
      title,
      body,
      priority,
    };

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire("Success", "Ticket submitted successfully!", "success");
        setDepartmentId("");
        setSubdepartment("");
        setTitle("");
        setBody("");
        setPriority(1);
      } else {
        Swal.fire("Error", result.message || "Failed to submit ticket", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto p-6 bg-white text-black shadow-md rounded space-y-6 sm:p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold">Send Ticket to Host</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Subdepartment</label>
        <select
          value={subdepartment}
          onChange={(e) => setSubdepartment(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select subdepartment</option>
          {filteredSubdepartments.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-2 rounded border border-black text-black bg-white transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
          }`}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-6 py-2 rounded border border-black text-black bg-white hover:bg-gray-100 transition"
        >
          Cancel & Go Back
        </button>
      </div>
    </form>
  );
}

export default SendTicketForm;