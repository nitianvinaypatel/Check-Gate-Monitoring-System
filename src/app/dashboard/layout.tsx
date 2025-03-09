"use client";

import DashboardLayout, {
  useSidebarToggle,
} from "@/components/dashboard/dashboard-layout";
import { Navbar } from "@/components/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebarToggle();

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full h-full">
        <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Navbar onMenuClick={toggleSidebar} />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </DashboardLayout>
  );
}
