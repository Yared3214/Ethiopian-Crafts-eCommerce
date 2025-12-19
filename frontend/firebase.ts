import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  Messaging,
} from "firebase/messaging";

// 🔐 Firebase config (env vars must exist)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// ✅ Initialize app safely (Next.js compatible)
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Returns a messaging instance only if supported
 * (prevents SSR / unsupported browser crashes)
 */
export const getMessagingInstance = async (): Promise<{
  messaging: Messaging;
} | null> => {
  const supported = await isSupported();
  if (!supported) return null;

  const messaging = getMessaging(app);
  return { messaging };
};

/**
 * Fetch FCM token
 */
export const fetchToken = async (): Promise<string | null> => {
  try {
    const messagingInstance = await getMessagingInstance();
    if (!messagingInstance) return null;

    const token = await getToken(messagingInstance.messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
    });

    return token ?? null;
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    return null;
  }
};
