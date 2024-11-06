// src/app/layout.tsx

"use client"; // This file is now a Client Component

import { useEffect } from "react"; // Import useEffect
import Header from "@/components/Header/Header"; // Adjust the path to your Header component
import Footer from "@/components/Footer/footer"; // Adjust the path to your Footer component
import { Provider, useDispatch } from "react-redux"; // Import useDispatch
import store from "@/store/store"; // Adjust the path to your Redux store
import localFont from "next/font/local";
import "./globals.css";
import { setUserFromCookie } from "@/store/feature/user/userSlice"; // Import the action

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Component to initialize user state
const InitializeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to set user from cookie
    dispatch(setUserFromCookie());
  }, [dispatch]);

  return null; // This component doesn't render anything
};

// Layout component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <InitializeUser /> {/* Add the component to initialize user state */}
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
