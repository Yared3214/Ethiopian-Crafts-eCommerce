import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { authenticatedRequest } from '../middlewares/authMiddleware';
import { notificationService } from '../services/notification.service';
import { Types } from 'mongoose';
// import { deliveryService } from '../services/delivery.service'; // optional

/**
 * Create a new notification
 */
export const createNotification = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { userId, title, message, type, link, read } = req.body;
        if (!userId) {
            throw new ApiError(400, 'User ID is required');
        }
        if (!title) {
            throw new ApiError(400, 'Title is required');
        }
        if (!message) {
            throw new ApiError(400, 'Message is required');
        }
        if (!type) {
            throw new ApiError(400, 'Type is required');
        }
        const newNotification = await notificationService.createNotification({
            user: userId,
            title,
            message,
            link,
            type,
            read,
        });
        res.status(201).json({
            status: 'success',
            data: { notification: newNotification },
        });
    } catch (error: any) {
        console.error('Error creating notification:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

/**
 * Get all notifications for a specific user
 */
export const getAllUserNotifications = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const notifications = await notificationService.getAllUserNotifications(userId);
        res.status(200).json({
            status: 'success',
            data: { notifications },
        });
    } catch (error: any) {
        console.error('Error getting user notifications:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

export const markNotificationAsRead = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { notificationId } = req.body;
        if (!notificationId) {
            throw new ApiError(400, 'Notification ID is required');
        }
        const notification = await notificationService.markNotification(notificationId);
        res.status(200).json({
            status: 'success',
            data: { notification },
        });
    } catch (error: any) {
        console.error('Error marking notification as read:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};

export const markAllUserNotificationsAsRead = async (req: authenticatedRequest, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            throw new ApiError(400, 'User ID is required');
        }
        await notificationService.markAllUserNotifications(userId);
        res.status(200).json({
            status: 'success',
            message: 'All notifications marked as read',
        });
    } catch (error: any) {
        console.error('Error marking all notifications as read:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Internal Server Error',
        });
    }
};
