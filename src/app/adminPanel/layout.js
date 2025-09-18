import Sidebar from "@/components/modules/sidebar/Sidebar";
import Topbar from "@/components/modules/topbar/Topbar";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Panel | Coffee Shop",
  description: "Coffee Shop Project",
};

export default async function AdminLayout({ children }) {
  const user = await authUser();
  const isAdmin = true;
  if (!user) {
    redirect("./login-register");
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar isAdmin={isAdmin} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
