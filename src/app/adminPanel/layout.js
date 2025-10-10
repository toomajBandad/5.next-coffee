import Sidebar from "@/components/modules/sidebar/Sidebar";
import SidebarTop from "@/components/modules/sidebartop/SidebarTop";
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
    redirect("/login-register");
  }
  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar username={JSON.parse(JSON.stringify(user.username))} />

      {/* Show SidebarTop on sm and md */}
      <div className="block lg:hidden w-full">
        <SidebarTop isAdmin={isAdmin} />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Show Sidebar on lg and above */}
        <div className="hidden lg:flex">
          <Sidebar isAdmin={isAdmin} />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
