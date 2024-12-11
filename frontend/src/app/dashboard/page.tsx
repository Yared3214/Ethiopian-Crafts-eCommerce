// "use client"

// import React from 'react';
// import { logout } from '@/store/feature/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation'

// const DashboardPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const logoutHandler = () => {
//         dispatch(logout());
//         router.push('/');
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Dashboard</h1>
//             <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//                 <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//                     <h2>Statistics</h2>
//                     <p>Some statistics here...</p>
//                 </div>
//                 <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//                     <h2>Recent Orders</h2>
//                     <p>List of recent orders...</p>
//                 </div>
//                 <div style={{ width: '30%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//                     <h2>Loogut here</h2>
//                     <button className='cursor-pointer transition border border-red-200 rounded-md px-4 py-2 text-white bg-red-500 hover:bg-red-400' onClick={logoutHandler}>logout</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;


"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Components for different sections
const DashboardContent = () => (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Dashboard Content</h2>
        <p>Here is some content for the dashboard.</p>
    </div>
);

const ProfileContent = () => (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Profile Content</h2>
        <p>Manage your profile settings here.</p>
    </div>
);

const SettingsContent = () => (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h2>Settings Content</h2>
        <p>Update your account and app settings here.</p>
    </div>
);

const DashboardPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("dashboard"); // track active link

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
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "profile",
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            value: "settings",
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];

    const handleLinkClick = (linkValue: string) => {
        setActiveLink(linkValue);
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
                        {/* {open ? <Logo /> : <LogoIcon />} */}
                        <Link href='/'>E-Commerce</Link>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={() => handleLinkClick(link.value)} // handle click
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
                {activeLink === "profile" && <ProfileContent />}
                {activeLink === "settings" && <SettingsContent />}
            </div>
        </div>
    );
}

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
