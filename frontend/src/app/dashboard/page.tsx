"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconHeart,
    IconLayoutDashboard,
    IconPackage,
    IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { logout } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ProductManager from "@/components/ManageProducts/manageProdcuts";
import BlogManager from "@/components/ManageBlogs/manageBlogs";
import UserManager from "@/components/ManageUsers/manageUsers";
import CustomerDashboardContent from "@/components/CustomerDashboardContent/customerDashboardContent";
import PurchasedProducts from "@/components/CustomerOrders/customerOrders";
import SavedProducts from "@/components/CustomerSavedProducts/customerSavedProducts";
import CustomerProfile from "@/components/CustomerProfile/customerProfile";

const DashboardPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("overview"); // Track active link
    const dispatch = useDispatch();
    const router = useRouter();


    const links = [
        {
            label: "Overiview",
            href: "#",
            icon: (
                <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "overview",
        },
        {
            label: "Orders",
            href: "#",
            icon: (
                <IconPackage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "orders",
        },
        {
            label: "Saved",
            href: "#",
            icon: (
                <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "saved",
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "profile",
        },
    ];

    const handleLinkClick = (linkValue: string, event?: React.MouseEvent) => {
        if (linkValue === "logout") {
            if (event) event.preventDefault(); // Prevent default link navigation
            handleLogout(); // Call the logout logic
        } else {
            setActiveLink(linkValue);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/signin');
    };

    return (
        <div
        className={cn(
          "flex flex-col md:flex-row w-full h-[99.5vh] overflow-hidden",
          "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950"
        )}
>
  <Sidebar open={open} setOpen={setOpen}>
    <SidebarBody className="justify-between gap-8 p-4">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Link 
          href="/" 
          className="text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-200"
        >
          E-Commerce
        </Link>

        <div className="mt-6 flex flex-col gap-1.5">
          {links.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              isActive={activeLink === link.value}
              onClick={(e) => handleLinkClick(link.value, e)}
            />
          ))}
        </div>
      </div>

      {/* Footer / Profile */}
      <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-700/50">
        <SidebarLink
          link={{
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
          }}
        />
      </div>
    </SidebarBody>
  </Sidebar>

  {/* Content Area */}
  <div 
    className="flex flex-1 bg-white dark:bg-neutral-900 
    border-l border-neutral-200 dark:border-neutral-800 
    shadow-inner rounded-l-2xl overflow-y-auto"
  >
    {activeLink === "overview" && <CustomerDashboardContent />}
    {activeLink === "orders" && <PurchasedProducts />}
    {activeLink === "saved" && <SavedProducts />}
    {activeLink === "profile" && <CustomerProfile />}
  </div>
</div>

    );
};

export default DashboardPage;

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Acet Labs
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};
