import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 border-r min-h-screen">
          <SideNav />
        </aside>

        <main className="flex-1">
          <div className="border-b">
            <TopBar />
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}