import Tickets from "@/components/templates/p-user/Tickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import React from "react";
import ticketModel from "@/models/Ticket";

async function AdminTickets() {
  await connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ userID: user._id })
    .populate("department")
    .populate("subDepartment")
    .populate("userID");

  return (
    <div>
      AdminTickets
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </div>
  );
}

export default AdminTickets;
