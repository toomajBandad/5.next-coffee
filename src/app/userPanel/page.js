import Box from "@/components/modules/box/Box";
import Orders from "@/components/templates/p-user/Orders";
import Tickets from "@/components/templates/p-user/Tickets";
import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import wishlistModel from "@/models/wishList";
import commentModel from "@/models/Comment";
import { authUser } from "@/utils/authUser";
import {
  FaComment,
  FaHeart,
  FaTicketAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default async function userHome() {
  await connectToDB();
  const user = await authUser();

  // ✅ Parallel count queries for performance
  const [wishCount, commentCount, ticketCount] = await Promise.all([
    wishlistModel.countDocuments({ userId: user._id }),
    commentModel.countDocuments({ userID: user._id }),
    ticketModel.countDocuments({ userID: user._id }),
  ]);

  // ✅ Fetch ticket details for rendering
  const tickets = await ticketModel
    .find({ userID: user._id })
    .populate("department")
    .populate("subDepartment")
    .populate("userID");

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
        Your Dashboard
      </h1>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box
          icon={<FaComment />}
          title="Comments Count"
          number={commentCount}
        />
        <Box icon={<FaHeart />} title="Favorites Count" number={wishCount} />
        <Box
          icon={<FaTicketAlt />}
          title="Tickets Count"
          number={ticketCount}
        />
        <Box icon={<FaShoppingCart />} title="Orders Count" number={7} />
      </div>

      <div className="mt-10 space-y-10">
        <hr className="border-t border-gray-300" />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              🎫 Recent Tickets
            </h2>
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="space-y-4">
            <Tickets
              tickets={JSON.parse(JSON.stringify(tickets)).slice(0, 6)}
            />
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🛒 Your Orders
          </h2>
          <Orders />
        </section>
      </div>
    </>
  );
}
