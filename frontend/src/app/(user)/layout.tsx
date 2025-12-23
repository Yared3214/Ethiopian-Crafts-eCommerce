"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFcmToken from "@/hooks/useFcmToken";
import { RootState } from "@/store/store";
import { saveFcmToken } from "@/api/user/userAPI";

export default function FirebaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useFcmToken();

  const user = useSelector((state: RootState) => state.user.user?.user);

  useEffect(() => {
    if (!token || !user) return;

    const persistToken = async () => {
      try {
        console.log("Saving FCM token to DB...");
        await saveFcmToken(token);
        console.log("FCM token saved successfully");
      } catch (err) {
        console.error("Failed to save FCM token:", err);
      }
    };

    persistToken();
  }, [token, user]);

  return <>{children}</>;
}
