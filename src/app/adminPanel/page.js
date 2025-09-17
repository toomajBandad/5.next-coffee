import Box from "@/components/modules/box/Box";
import Orders from "@/components/templates/p-user/Orders";
import Tickets from "@/components/templates/p-user/Tickets";
import {
  FaComment,
  FaHeart,
  FaTicketAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default async function adminHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box icon={<FaComment />} title="Comments Count" number={10} />
        <Box icon={<FaHeart />} title="Wish List Count" number={6} />
        <Box icon={<FaTicketAlt />} title="Tickets Count" number={4} />
        <Box icon={<FaShoppingCart />} title="Orders Count" number={7} />
      </div>
      <div>
        <Tickets />
        <Orders />
      </div>
    </div>
  );
}
