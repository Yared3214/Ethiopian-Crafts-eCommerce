import store from "@/store/store";
import { User } from "@/types/user";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to safely extract error message
const parseAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Network error';
  };


export interface Notification {
    _id: string;
    user: User;
    title: string;
    message: string;
    link?: string;
    type: "order" | "message" | "promo" | "system";
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationResponse {
    status: string;
    data: {
        notifications: Notification[];
    };
}

interface markNotificationAsReadResponse {
  status: string;
  data: {
    notification: Notification;
  }
}

interface markAllNotificationsAsReadResponse {
  status: string;
  message: string;
}



// send order status noification to a user
export const sendOrderStatusNotification = async(fcmToken: string, orderStatus: string) => {
  try {
    const response = await axios.post('/send-notification', {
      token: fcmToken,
      title: 'Your Delivery Status Has Changed',
      message: `Your package is now: ${orderStatus}. Tap to track its progress.`,
      link: `https://localhost:3000/dashboard?tab=orders`, // Link to the user's last order
  }, 
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }); 
  const data = await response.data;
  console.log(data);
  return data;
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    throw parseAxiosError(error);
  }
}

export const createNotification = async ( userId: string, title: string, message: string, link: string | '', type: "order" | "message" | "promo" | "system") => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if(!token) throw new Error("User is not authenticated");
    const response = await axios.post(`${API_URL}/notifications`, {
      userId,
      title,
      message,
      link,
      type,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log(data);
  return data;
  } catch (error: unknown) {
    console.error("Error creating notification:", error);
    throw parseAxiosError(error);
  }
}

export const getUserNotifications = async (userId: string): Promise<NotificationResponse> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if(!token) throw new Error("User is not authenticated");
    const response = await axios.get(`${API_URL}/notifications/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching user notifications:", error);
    throw parseAxiosError(error);
  }
}

export const markNotificationAsRead_ = async (notificationId: string): Promise<markNotificationAsReadResponse> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if(!token) throw new Error("User is not authenticated");
    const response = await axios.post(`${API_URL}/notifications/read`, {
      notificationId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error marking notification as read:", error);
    throw parseAxiosError(error);
  }
}

export const markAllNotificationsAsRead_ = async (userId: string): Promise<markAllNotificationsAsReadResponse> => {
  try {
    const token = store.getState().user.user?.tokens.access.token;
    if(!token) throw new Error("User is not authenticated");
    const response = await axios.post(`${API_URL}/notifications/all-read`, {
      userId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error marking all notifications as read:", error);
    throw parseAxiosError(error);
  }
}