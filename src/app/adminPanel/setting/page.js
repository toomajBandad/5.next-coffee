import React from "react";
import AcountDetail from "@/components/templates/p-user/AcountDetail";

function AdminSetting() {
  return (
    <>

        {/* Page Header */}
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account details and preferences below.
          </p>
        </div>

        {/* Account Detail Section */}
        <div className="bg-gray-50 p-6 ">
          <AcountDetail />
        </div>

    </>
  );
}

export default AdminSetting;