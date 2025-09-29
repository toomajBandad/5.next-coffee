import Footer from "@/components/modules/footer/Footer";
import "./globals.css";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/scrollToTop";
import wishListModel from "@/models/wishList";
import { authUser } from "@/utils/authUser";
import Navbar from "@/components/modules/navbar/Navbar";

export const metadata = {
  title: "Main Page | Coffee Shop",
  description: "Coffee Shop Project",
};

export default async function RootLayout({ children }) {
  const user = await authUser();
  const isLogin = !!user;
  const isAdmin = user?.role === "ADMIN";
  const wishes = user
    ? await wishListModel.find({ userId: user._id }).lean()
    : [];

  return (
    <html lang="en">
      <head />
      <body>
        <AOSInit />
        <Navbar
          user={JSON.parse(JSON.stringify(user))}
          wishes={JSON.parse(JSON.stringify(wishes))}
          isAdmin={isAdmin}
          isLogin={isLogin}
        />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
