"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { QrCode, LayoutGrid, BarChart3, Gem, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: <LayoutGrid />, label: "Oversikt" },
  { href: "/dashboard/menus", icon: <QrCode />, label: "Menyer" },
  { href: "/dashboard/analytics", icon: <BarChart3 />, label: "Analyse" },
  { href: "/dashboard/subscription", icon: <Gem />, label: "Abonnement" },
  { href: "/dashboard/settings", icon: <Settings />, label: "Innstillinger" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">MenyQR</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side:"right" }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
