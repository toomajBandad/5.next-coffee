// components/modules/order/Orders.tsx
import Order from "@/components/modules/order/Order";

export default function Orders() {
  const recentOrders = [
    { id: "#ORD-001", user: "alice@example.com", time: "2 hours ago", status: "Processing" },
    { id: "#ORD-002", user: "bob@example.com", time: "Yesterday", status: "Shipped" },
    { id: "#ORD-003", user: "carol@example.com", time: "3 days ago", status: "Delivered" },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      {recentOrders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No orders found.</p>
          <p className="text-sm">Looks like your customers are taking a break 💤</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentOrders.map((order, index) => (
            <Order key={index} {...order} />
          ))}
        </div>
      )}
    </div>
  );
}
