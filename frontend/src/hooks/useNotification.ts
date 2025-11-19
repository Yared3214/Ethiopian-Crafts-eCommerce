import { getUserNotifications, markAllNotificationsAsRead_, markNotificationAsRead_ } from '@/api/notification/notificationApi'
import { markAllNotificationsAsRead, markNotificationAsRead, setNotifications } from '@/store/feature/notification/notificationSlice'
import store from '@/store/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


const useNotification = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    const fetchUserNotifications = async() => {
        setError(null)
        setLoading(true);
        try {
            const userId = store.getState().user.user?.user._id as string;
            const data = await getUserNotifications(userId);
            console.log("notifications: ", data.data.notifications);
            dispatch(setNotifications(data.data.notifications));
        } catch (error) {
            setError((error as any).message || 'Failed to fetch notifications')
        } finally {
            setLoading(false);
        }
    }

    const markAsRead = async(id: string) => {
        setError(null)
        setLoading(true)
        try {
            // Implementation for marking a notification as read
            await markNotificationAsRead_(id);
            dispatch(markNotificationAsRead(id));
        } catch (error) {
            setError((error as any).message || 'Failed to mark notification as read')
        } finally {
            setLoading(false);
        }
    }

    const markAllAsRead = async() => {
        setError(null)
        setLoading(true)
        try {
            // Implementation for marking all notifications as read
            const userId = store.getState().user.user?.user._id as string;
            await markAllNotificationsAsRead_(userId);
            dispatch(markAllNotificationsAsRead());
        } catch (error) {
            setError((error as any).message || 'Failed to mark all notifications as read')
        } finally {
            setLoading(false);
        }
    }



    return { error, loading, fetchUserNotifications, markAsRead, markAllAsRead }
}

export default useNotification;
