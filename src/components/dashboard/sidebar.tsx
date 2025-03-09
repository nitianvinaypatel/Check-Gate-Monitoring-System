"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Map,
  FileText,
  User,
  Users,
  Settings,
  LogOut,
  AlertTriangle,
  BarChart3,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Vehicles",
    icon: Car,
    href: "/dashboard/vehicles",
    color: "text-blue-600",
  },
  {
    label: "Monitoring",
    icon: Activity,
    href: "/dashboard/monitoring",
    color: "text-violet-500",
  },
  {
    label: "Checkpoints",
    icon: Map,
    href: "/dashboard/checkpoints",
    color: "text-pink-700",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "text-yellow-600",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
    color: "text-orange-700",
  },
  {
    label: "Alerts",
    icon: AlertTriangle,
    href: "/dashboard/alerts",
    color: "text-red-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    color: "text-purple-500",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full overflow-y-auto bg-background border-r">
      <div className="flex flex-col min-h-full py-6">
        <div className="px-3 py-2 flex-none">
          <div className="px-2 mb-6">
            <h2 className="text-xl font-bold tracking-tight mb-1">
              Mizoram Police
            </h2>
            <h3 className="text-sm text-muted-foreground">
              Check Gate Monitoring
            </h3>
          </div>

          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                  pathname === route.href ||
                    (pathname === "/dashboard" &&
                      route.href === "/dashboard") ||
                    (pathname.startsWith(route.href) &&
                      route.href !== "/dashboard")
                    ? "bg-primary/10"
                    : "transparent"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto px-3 py-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-start"
            asChild
          >
            <Link href="/api/auth/signout">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
