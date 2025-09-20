import React from "react";
import AcountDetail from "@/components/templates/p-user/AcountDetail";

function AdminSetting() {
  return (
    <div className="bg-white text-black px-4 pt-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">User Settings</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Manage your account details and preferences.
          </p>
        </div>

        {/* Account Detail Section */}
        <AcountDetail />
      </div>
    </div>
  );
}

export default AdminSetting;