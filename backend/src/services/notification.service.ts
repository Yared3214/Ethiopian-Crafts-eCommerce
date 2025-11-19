import Notification, { INotification } from '../models/notification.schema';
import { Types } from 'mongoose';

class NotificationService {
  /**
   * Create a new notification
   */
    async createNotification(data: {
      user: Types.ObjectId;
      title: string;
      message: string;
      link?: string;
      type: string;
      read: boolean;
    }): Promise<INotification> {
            const newNotification = new Notification({
                user: data.user, // Placeholder, should be set to the intended user ID
                title: data.title,
                message: data.message,
                link: data.link,
                type: data.type,
                read: data.read,
            });
            await newNotification.save();
            return newNotification;
    }

    /**
     * Get all notifications for a specific user
     */
    async getAllUserNotifications(userId: string): Promise<INotification[]> {
        return await Notification.find({ user: userId }).sort({ createdAt: -1 });
    }

    /**
     * Get all notifications (Admin)
     */
    async getAllNotifications(): Promise<INotification[]> {
        return await Notification.find().sort({ createdAt: -1 });
    }

    /**
     * Mark a notification as read
     */
    async markNotification(notificationId: string): Promise<void> {
        await Notification.findByIdAndUpdate(notificationId, { read: true });
    }

    async markAllUserNotifications(userId: string): Promise<void> {
        await Notification.updateMany({ user: userId, read: false }, { read: true });
    }

    /**
     * Get a notification by ID
     */
    async getNotificationById(notificationId: Types.ObjectId): Promise<INotification | null> {
        return await Notification.findById(notificationId).populate('user', 'fullName email address');
    }
}

export const notificationService = new NotificationService();
