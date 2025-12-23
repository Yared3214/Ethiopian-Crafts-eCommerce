import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  Messaging,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Safe messaging getter (SSR + unsupported browser safe)
 */
export const getMessagingInstance = async (): Promise<{
  messaging: Messaging;
} | null> => {
  const supported = await isSupported();
  if (!supported) return null;

  return { messaging: getMessaging(app) };
};

/**
 * Fetch FCM token
 */
export const fetchToken = async (): Promise<string | null> => {
  try {
    const instance = await getMessagingInstance();
    if (!instance) return null;

    const token = await getToken(instance.messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
    });

    return token ?? null;
  } catch (err) {
    console.error("Error fetching FCM token:", err);
    return null;
  }
};
