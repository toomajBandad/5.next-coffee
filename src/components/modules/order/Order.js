// components/modules/order/Order.tsx
import { FaUserCircle, FaClock, FaReceipt } from "react-icons/fa";

export default function Order({ id, user, time, status }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <h4 className="text-lg font-semibold flex items-center space-x-2">
        <FaReceipt />
        <span>{id}</span>
      </h4>
      <div className="text-sm text-gray-600 mt-2 flex items-center space-x-2">
        <FaUserCircle />
        <span>{user}</span>
      </div>
      <div className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
        <FaClock />
        <span>{time}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-blue-600">
        Status: {status}
      </div>
    </div>
  );
}
