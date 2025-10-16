import { FaUserCircle, FaClock, FaReceipt, FaBoxOpen } from "react-icons/fa";

export default function Order({ order }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition space-y-3">
      {/* Order ID */}
      <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
        <FaReceipt className="text-blue-600" />
        <span className="truncate">{order._id}</span>
      </h4>

      {/* User Info */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaUserCircle className="text-gray-500" />
        <span>
          {order.userId?.username || "Unknown"} ({order.userId?.email})
        </span>
      </div>

      {/* Created At */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaClock className="text-gray-500" />
        <span>{new Date(order.createdAt).toLocaleString()}</span>
      </div>

      {/* Status */}
      <div className="text-sm font-medium text-blue-700">
        Status: <span className="capitalize">{order.status}</span>
      </div>

      {/* Items */}
      <div className="mt-2">
        <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FaBoxOpen className="text-green-600" />
          Items:
        </h5>
        <ul className="mt-1 pl-4 list-disc text-sm text-gray-700 space-y-1">
          {order.items.map((item, index) => (
            <li key={index}>
              <span className="font-medium">Product:</span>{" "}
              {item.productId?.name || item.productId?._id}
              <span className="ml-2 font-medium">x</span>{item.quantity}
              <span className="ml-2 text-gray-500">€{item.productId?.price?.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="text-sm font-semibold text-gray-800">
        Total: €{order.total.toFixed(2)}
      </div>
    </div>
  );
}