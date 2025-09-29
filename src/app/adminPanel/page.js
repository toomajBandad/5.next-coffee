import Box from "@/components/modules/box/Box";
import GrowthChart from "@/components/templates/p-admin/GrowthChart";
import SaleChart from "@/components/templates/p-admin/SaleChart";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import productModel from "@/models/Product";
import ticketModel from "@/models/Ticket";
import commentModel from "@/models/Comment";
import discountModel from "@/models/Discount";
import articleModel from "@/models/Article";
import {
  FaUsers,
  FaBoxOpen,
  FaTicketAlt,
  FaComments,
} from "react-icons/fa";
import { PiArticleNyTimes } from "react-icons/pi";
import { TbRosetteDiscount } from "react-icons/tb";

export default async function adminHome() {
  await connectToDB();

  const [
    userCount,
    productCount,
    ticketCount,
    commentCount,
    discountCount,
    articleCount,
  ] = await Promise.all([
    userModel.countDocuments(),
    productModel.countDocuments(),
    ticketModel.countDocuments(),
    commentModel.countDocuments(),
    discountModel.countDocuments(),
    articleModel.countDocuments(),
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box icon={<FaUsers />} title="Total Users" number={userCount} />
        <Box icon={<FaBoxOpen />} title="Total Products" number={productCount} />
        <Box icon={<FaTicketAlt />} title="Total Tickets" number={ticketCount} />
        <Box icon={<FaComments />} title="Total comments" number={commentCount} />
        <Box icon={<TbRosetteDiscount />} title="Total discounts" number={discountCount} />
        <Box icon={<PiArticleNyTimes />} title="Total articles" number={articleCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SaleChart />
        <GrowthChart />
      </div>
    </div>
  );
}