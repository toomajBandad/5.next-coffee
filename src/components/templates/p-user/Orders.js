// components/modules/order/Orders.tsx
import Order from "@/components/modules/order/Order";

export default function Orders({ orders }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg mt-0">
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
