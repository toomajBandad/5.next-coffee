import Box from "@/components/modules/box/Box";
import Orders from "@/components/templates/p-user/Orders";
import Tickets from "@/components/templates/p-user/Tickets";
import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/authUser";
import {
  FaUsers,
  FaBoxOpen,
  FaTicketAlt,
  FaClipboardList,
} from "react-icons/fa";

export default async function adminHome() {
  await connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ userID: user._id })
    .populate("department")
    .populate("subDepartment")
    .populate("userID");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Box icon={<FaUsers />} title="Total Users" number={103} />
      <Box icon={<FaBoxOpen />} title="Total Products" number={68} />
      <Box icon={<FaTicketAlt />} title="Total Tickets" number={45} />
      <Box icon={<FaClipboardList />} title="Total Orders" number={79} />

      </div>
      <div>
        <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
        <Orders />
      </div>
    </div>
  );
}
