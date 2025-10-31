"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconShoppingBagPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { logout } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AddProductForm from "@/components/AddProduct/addProduct";

// Components for different sections
const DashboardContent = () => (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Dashboard Content</h2>
        <p>Here is some content for the dashboard.</p>
    </div>
);

const DashboardPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("dashboard"); // Track active link
    const dispatch = useDispatch();
    const router = useRouter();


    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "dashboard",
        },
        {
            label: "Add Product",
            href: "#",
            icon: (
                <IconShoppingBagPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            value: "add-product",
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "logout",
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
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-[99.5vh]"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Link href="/">E-Commerce</Link>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={(e) => handleLinkClick(link.value, e)} // Handle click
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#mydash",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1">
                {/* Conditionally render content based on the active link */}
                {activeLink === "dashboard" && <DashboardContent />}
                {activeLink === "add-product" && <AddProductForm/>}
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
