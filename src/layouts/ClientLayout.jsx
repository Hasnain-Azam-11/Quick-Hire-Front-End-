import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/layout/ClientSidebar";

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <ClientSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
