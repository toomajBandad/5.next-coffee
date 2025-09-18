import connectToDB from "@/configs/db";
import React from "react";
import ticketModel from "@/models/Ticket";

async function AdminAnswerTickets({ params }) {
  const ticketID = params.id;
  await connectToDB();
  const ticket = await ticketModel.findById(ticketID).populate("userID");
  console.log(ticket);
  

  return <div>AdminAnswerTickets</div>;
}

export default AdminAnswerTickets;
