import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import orderModel from "@/models/Order";
import Orders from "@/components/templates/p-user/Orders";

async function OrdersPage() {
  await connectToDB();
  const user = await authUser();

  const orders = await orderModel.find({ userId: user._id }).populate("userId").populate("items.productId").sort({ createdAt: -1 });

  return (
    <div>
      <Orders orders={JSON.parse(JSON.stringify(orders))} />
    </div>
  );
}

export default OrdersPage;
