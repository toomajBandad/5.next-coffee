import WishListCard from "@/components/templates/p-user/WishListCard";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import wishListModel from "@/models/wishList";

async function AdminWishList() {
  try {
    await connectToDB();
    const user = await authUser();
    const wishlist = await wishListModel
      .find({ userId: user._id })
      .populate("productId")
      .lean();

    // Deep sanitize using JSON methods
    const sanitizedWishlist = JSON.parse(JSON.stringify(wishlist));

    return (
      <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
        <header>
          <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
            User Favorites
          </h1>
        </header>

        {sanitizedWishlist.length === 0 ? (
          <section className="text-center text-gray-500 mt-20">
            <p className="text-xl">No products in the wishlist.</p>
          </section>
        ) : (
          <section>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sanitizedWishlist.map((item) => (
                <li key={item._id}>
                  <WishListCard product={item.productId} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    );
  } catch (error) {
    console.error("Failed to load wishlist:", error);
    return (
      <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
          Admin Wish List
        </h1>
        <div className="text-center text-red-500 mt-20">
          <p className="text-xl">
            Something went wrong. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}

export default AdminWishList;
