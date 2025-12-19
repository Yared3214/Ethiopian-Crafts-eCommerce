// app/dashboard/notifications/page.tsx or any page
"use client";

import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Package,
  MessageCircle,
  Tag,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Notification } from "@/api/notification/notificationApi";
import useNotification from "@/hooks/useNotification";


const getTypeConfig = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return { icon: Package, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
    case "message":
      return { icon: MessageCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    case "promo":
      return { icon: Tag, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" };
    case "system":
      return { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
    default:
      // ← THIS WAS MISSING!
      return { icon: Bell, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
  }
};

const groupNotifications = (notifications: Notification[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups = {
    Today: [] as Notification[],
    Yesterday: [] as Notification[],
    Earlier: [] as Notification[],
  };

  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    if (date >= today) groups.Today.push(n);
    else if (date >= yesterday) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  });

  return groups;
};

export default function NotificationCenter() {
  const { fetchUserNotifications, markAsRead, markAllAsRead } = useNotification();
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  // const [notifications, setNotifications] = useState(userNotifications);
  const unreadCount = notifications?.filter((n) => !n.read).length;

  useEffect(() => {
          if (!notifications || notifications.length === 0) {
            fetchUserNotifications();
          }
        }, [notifications, fetchUserNotifications]);

  const handleMarkAsRead = async(id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async() => {
    await markAllAsRead();
  };

  const grouped = groupNotifications(notifications);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 w-full">
        <div className="w-full px-4 py-12 sm:px-6 lg:px-8 xl:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Floating Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Bell className="h-10 w-10 text-indigo-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Notifications
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Stay updated with your orders, messages, and promotions
          </p>
        </div>

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <div className="flex justify-end mb-6">
            <Button onClick={handleMarkAllAsRead} variant="secondary" className="shadow-md">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        )}

        {/* Notification Feed */}
        <div className="space-y-8">
          <AnimatePresence>
            {Object.entries(grouped).map(([period, items]) =>
              items.length > 0 ? (
                <motion.div
                  key={period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    <Clock className="h-4 w-4" />
                    {period}
                  </div>

                  {/* Notifications */}
                  <div className="space-y-3">
                    {items.map((notif, idx) => {
                      const config = getTypeConfig(notif.type);
                      const Icon = config?.icon;

                      return (
                        <motion.div
                          key={notif._id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="group cursor-pointer"
                        >
                          <div
                            className={`
                              relative p-6 rounded-2xl border transition-all duration-300
                              ${!notif.read
                                ? "bg-white dark:bg-neutral-800 border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/50"
                                : "bg-white/70 dark:bg-neutral-800/70 border-transparent hover:border-gray-200 dark:hover:border-neutral-700"
                              }
                              hover:shadow-xl hover:-translate-y-1
                            `}
                          >
                            {/* Unread Indicator */}
                            {!notif.read && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-600 rounded-r-full"></div>
                            )}

                            <div className="flex gap-5">
                              {/* Icon */}
                              <div
                                className={`
                                  p-3 rounded-full border-2 flex-shrink-0
                                  ${config?.bg} ${config?.border}
                                `}
                              >
                                <Icon className={`h-6 w-6 ${config?.color}`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                                      {notif.title}
                                      {!notif.read && (
                                        <Badge className="h-5 px-2 text-xs" variant="default">
                                          New
                                        </Badge>
                                      )}
                                    </h3>
                                    <p className="mt-1 text-muted-foreground leading-relaxed">
                                      {notif.message}
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground/80">
                                      {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
                                    </p>
                                  </div>
                                  {!notif.read && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-100 dark:bg-neutral-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">You&#39;re all caught up!</h3>
              <p className="text-muted-foreground text-lg">
                No new notifications at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}