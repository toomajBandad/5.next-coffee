import React from "react";
import AcountDetail from "@/components/templates/p-user/AcountDetail";

function AdminSetting() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account details and preferences below.
          </p>
        </div>

        {/* Account Detail Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <AcountDetail />
        </div>
      </div>
    </div>
  );
}

export default AdminSetting;