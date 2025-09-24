import Sidebar from "@/components/modules/sidebar/Sidebar";
import Topbar from "@/components/modules/topbar/Topbar";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Panel | Coffee Shop",
  description: "Coffee Shop Project",
};

export default async function UserLayout({ children }) {
  const user = await authUser();

  if (!user) {
    redirect("/login-register");
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar username={JSON.parse(JSON.stringify(user.username))} />
      <div className="flex flex-1">
        <Sidebar isAdmin={false} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
