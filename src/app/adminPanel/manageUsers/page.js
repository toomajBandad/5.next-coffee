import UserEdit from "@/components/templates/p-admin/UserEdit";
import userModel from "@/models/User";
import React from "react";

async function ManageUsers() {
  const users = await userModel.find({}).lean();
  return (
    <div>
      <UserEdit users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}

export default ManageUsers;
