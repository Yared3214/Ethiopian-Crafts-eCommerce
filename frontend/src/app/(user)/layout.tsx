"use client";

import { useSelector } from "react-redux";
import useFcmToken from "@/hooks/useFcmToken";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { saveFcmToken } from "@/api/user/userAPI";

export default function FirebaseLayout({ children }: { children: React.ReactNode }) {

  const { token } = useFcmToken();

  const user = useSelector((state: RootState) => state.user.user?.user);

  useEffect(() => {
      if (!token || !user) return;
    
      const saveToken = async () => {
        try {
          console.log('saving fcm token to db....')
          const response = await saveFcmToken(token);
          console.log("FCM token saved successfully!", response);
        } catch (err) {
          console.error("Failed to save token:", err);
        }
      };
    
      saveToken();
    }, [token, user]);

  return (
    <>
      {children}
    </>
  );
}
