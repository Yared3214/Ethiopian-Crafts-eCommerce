import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK8mlFdMEjbv1H9RWey6L0uDKEPbw9K8g",
  authDomain: "fcm-craft-ecommerce.firebaseapp.com",
  projectId: "fcm-craft-ecommerce",
  storageBucket: "fcm-craft-ecommerce.firebasestorage.app",
  messagingSenderId: "824465857389",
  appId: "1:824465857389:web:94b120d783dc572f8dd864",
  measurementId: "G-JK3SG2CB8F"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
