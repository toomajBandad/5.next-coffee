import TicketEdit from "@/components/templates/p-admin/TicketEdit";
import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import React from "react";

async function ManageTickets() {
  await connectToDB();
  const tickets = await ticketModel.find({}).lean();
  return (
    <div>
      <TicketEdit tickets={JSON.parse(JSON.stringify(tickets))} />
    </div>
  );
}

export default ManageTickets;
