import { Outlet } from "react-router-dom";
import WorkerSidebar from "../components/layout/WorkerSidebar";

export default function WorkerLayout() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <WorkerSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
