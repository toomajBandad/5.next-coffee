import connectToDB from "@/configs/db";
import React from "react";
import ticketModel from "@/models/Ticket";

async function AdminAnswerTickets({ params }) {
  const { id } = await params;
  const ticketID = await id;
  await connectToDB();
  const ticket = await ticketModel.findById(ticketID).populate("userID");
  return <div>AdminAnswerTickets</div>;
}

export default AdminAnswerTickets;
