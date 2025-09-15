import Sidebar from "@/components/modules/sidebar/Sidebar";
import Topbar from "@/components/modules/topbar/Topbar";

export const metadata = {
  title: "Admin Panel | Coffee Shop",
  description: "Coffee Shop Project",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
