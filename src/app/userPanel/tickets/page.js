// app/(dashboard)/tickets/page.tsx

import React from "react";
import Link from "next/link";
import Tickets from "@/components/templates/p-user/Tickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import ticketModel from "@/models/Ticket";

async function TicketsPage() {
  await connectToDB();

  const user = await authUser();
  if (!user) {
    return (
      <div className="p-4 text-red-600">
        <h2>Unauthorized</h2>
        <p>Please log in to view your tickets.</p>
      </div>
    );
  }

  let tickets = [];
  try {
    tickets = await ticketModel
      .find({ userID: user._id })
      .populate("department")
      .populate("subDepartment")
      .populate("userID")
      .lean();
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">Your Tickets</h2>
        <Link
          href="./tickets/sendTicket"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Send New Ticket
        </Link>
      </div>

      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </>
  );
}

export default TicketsPage;
