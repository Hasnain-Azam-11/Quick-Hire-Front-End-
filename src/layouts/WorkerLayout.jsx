import { Outlet } from "react-router-dom";
import WorkerTopNav from "../components/layout/WorkerTopNav";

// The worker area uses a slim top bar instead of a full-height sidebar,
// so pages get the whole width of the screen.
export default function WorkerLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <WorkerTopNav />
      <main className="max-w-[1400px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
