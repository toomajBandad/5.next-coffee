import UserEdit from "@/components/templates/p-admin/UserEdit";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import React from "react";

async function ManageUsers() {
  await connectToDB();
  const users = await userModel.find({}).lean();
  return (
    <div>
      <UserEdit users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}

export default ManageUsers;
