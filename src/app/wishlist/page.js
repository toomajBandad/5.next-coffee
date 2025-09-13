// app/wishlist/page.tsx
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import wishListModel from "@/models/wishList";
import "@/models/Product";
import Card from "@/components/modules/card/Card";

export default async function WishListPage() {
  await connectToDB();
  const user = await authUser();
  let wishes = [];

  if (user) {
    wishes = await wishListModel
      .find({ userId: user._id })
      .populate("productId")
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Wishlist</h1>

        {wishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((item) => (
              <Card key={item._id} product={item.productId} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold text-gray-700">
              Nothing Found
            </h2>
            <p className="mt-2 text-gray-500">
              Unfortunately, your wishlist is currently empty.
            </p>
            <p className="mt-1 text-gray-500">
              Browse the store and add some favorites!
            </p>
            <a
              href="/store"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Store
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
