import React from "react";
import AcountDetail from "@/components/templates/p-user/AcountDetail";

function AdminSetting() {
  return (
    <>
      {/* Page Header */}
      <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
          User Settings
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Manage your account details and preferences.
        </p>
        <AcountDetail />
      </div>
    </>
  );
}

export default AdminSetting;
