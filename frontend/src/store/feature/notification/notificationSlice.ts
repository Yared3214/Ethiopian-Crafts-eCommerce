// src/features/artisan/artisanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/api/notification/notificationApi';

export interface Notifications {
    notifications: Notification[];
}

const initialState: Notifications = {  // Correct type for initialState
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },
        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notif = state.notifications.find(n => n._id === action.payload);
            if (notif) notif.read = true;
          },

          markAllNotificationsAsRead: (state) => {
            state.notifications.forEach(n => n.read = true);
          },
    },
});

export const { setNotifications, markNotificationAsRead, markAllNotificationsAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
