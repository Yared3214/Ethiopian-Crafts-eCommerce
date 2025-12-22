"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconHeart,
  IconLayoutDashboard,
  IconPackage,
  IconUser,
} from "@tabler/icons-react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CustomerDashboardContent from "@/components/CustomerDashboardContent/customerDashboardContent";
import PurchasedProducts from "@/components/CustomerOrders/customerOrders";
import SavedProducts from "@/components/CustomerSavedProducts/customerSavedProducts";
import CustomerProfile from "@/components/CustomerProfile/customerProfile";
import NotificationCenter from "@/components/UserNotifications/userNotification";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("overview");

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Sync URL → state
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveLink(tab);
  }, [searchParams]);

  const links = [
    {
      label: "Overview",
      icon: <IconLayoutDashboard className="h-5 w-5" />,
      value: "overview",
    },
    {
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      value: "notifications",
    },
    {
      label: "Orders",
      icon: <IconPackage className="h-5 w-5" />,
      value: "orders",
    },
    {
      label: "Saved",
      icon: <IconHeart className="h-5 w-5" />,
      value: "saved",
    },
    {
      label: "Profile",
      icon: <IconUser className="h-5 w-5" />,
      value: "profile",
    },
  ];

  const setTabParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleLinkClick = (value: string, e?: React.MouseEvent) => {
    e?.preventDefault();

    if (value === "logout") {
      dispatch(logout());
      router.replace("/signin");
      return;
    }

    setActiveLink(value);
    setTabParam(value);
  };

  return (
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden",
        "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-8 p-4">
          <div className="flex flex-1 flex-col">
            <Link href="/" className="text-lg font-semibold">
              E-Commerce
            </Link>

            <div className="mt-6 flex flex-col gap-1.5">
              {links.map((link) => (
                <SidebarLink
                  key={link.value}
                  link={{ ...link, href: "#" }}
                  isActive={activeLink === link.value}
                  onClick={(e) => handleLinkClick(link.value, e)}
                />
              ))}
            </div>
          </div>

          <SidebarLink
            link={{
              label: "Logout",
              href: "#",
              icon: <IconArrowLeft className="h-5 w-5" />,
            }}
            onClick={(e) => handleLinkClick("logout", e)}
          />
        </SidebarBody>
      </Sidebar>

      <main className="flex flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
        {activeLink === "overview" && <CustomerDashboardContent />}
        {activeLink === "orders" && <PurchasedProducts />}
        {activeLink === "saved" && <SavedProducts />}
        {activeLink === "profile" && <CustomerProfile />}
        {activeLink === "notifications" && <NotificationCenter />}
      </main>
    </div>
  );
};

export default Dashboard;
