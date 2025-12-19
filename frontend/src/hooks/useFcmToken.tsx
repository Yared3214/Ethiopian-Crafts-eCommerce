"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, getMessagingInstance } from "../../firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function getNotificationPermissionAndToken(): Promise<string | null> {
  if (!("Notification" in window)) return null;

  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  return null;
}

export interface UseFcmTokenReturn {
  fcmToken: string | null;
  notificationPermissionStatus: NotificationPermission | null;
}

const useFcmToken = (): UseFcmTokenReturn => {
  const router = useRouter();

  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null);

  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const token = await getNotificationPermissionAndToken();

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load FCM token. Please refresh the page.");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setFcmToken(token);
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

    const setupListener = async () => {
      if (!fcmToken) return;

      const messagingInstance = await getMessagingInstance();
      if (!messagingInstance) return;

      const { messaging } = messagingInstance;

      unsubscribe = onMessage(messaging, (payload) => {
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
            body: payload.notification?.body || "You have a new message",
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

    setupListener();

    return () => {
      unsubscribe?.();
    };
  }, [fcmToken, router]);

  return {
    fcmToken,
    notificationPermissionStatus,
  };
};

export default useFcmToken;
