"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, getMessagingInstance } from "../../firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface UseFcmTokenReturn {
  token: string | null;
  notificationPermissionStatus: NotificationPermission | null;
}

async function getPermissionAndToken(): Promise<string | null> {
  if (!("Notification" in window)) return null;

  if (Notification.permission === "granted") {
    return fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return fetchToken();
    }
  }

  return null;
}

const useFcmToken = (): UseFcmTokenReturn => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setPermissionStatus] =
    useState<NotificationPermission | null>(null);

  const retryCount = useRef(0);
  const isLoading = useRef(false);

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const fcmToken = await getPermissionAndToken();

    if (Notification.permission === "denied") {
      setPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    if (!fcmToken) {
      if (retryCount.current >= 3) {
        console.warn("FCM token could not be loaded.");
        isLoading.current = false;
        return;
      }

      retryCount.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    setPermissionStatus(Notification.permission);
    setToken(fcmToken);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const listen = async () => {
      if (!token) return;

      const instance = await getMessagingInstance();
      if (!instance) return;

      unsubscribe = onMessage(instance.messaging, (payload) => {
        if (Notification.permission !== "granted") return;

        const link = payload.fcmOptions?.link || payload.data?.link;

        toast.info(
          `${payload.notification?.title}: ${payload.notification?.body}`,
          link
            ? {
                action: {
                  label: "Visit",
                  onClick: () => router.push(link),
                },
              }
            : undefined
        );

        const notification = new Notification(
          payload.notification?.title || "New Notification",
          {
            body: payload.notification?.body || "",
            data: link ? { url: link } : undefined,
          }
        );

        notification.onclick = (event) => {
          event.preventDefault();
          const target = event.target as Notification & {
            data?: { url?: string };
          };

          if (target.data?.url) {
            router.push(target.data.url);
          }
        };
      });
    };

    listen();

    return () => unsubscribe?.();
  }, [token, router]);

  return {
    token,
    notificationPermissionStatus,
  };
};

export default useFcmToken;
