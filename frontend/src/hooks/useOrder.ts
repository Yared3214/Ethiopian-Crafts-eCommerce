import { sendOrderStatusNotification } from '@/api/notification/notificationApi'
import { getAllOrdersRequest, updateOrderStatusRequest } from '@/api/order/orderAPI'
import { setOrders, updateOrders } from '@/store/feature/order/orderSlice'
import store from '@/store/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


const useOrder = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    const fetchAllOrders = async() => {
        setError(null)
        setLoading(true);
        try {
            const token = store.getState().user.user?.tokens.access.token as string;
            const data = await getAllOrdersRequest(token);
            console.log("orders: ", data);
            dispatch(setOrders(data.data?.orders));
        } catch (error) {
            setError((error as any).message || 'Failed to fetch orders')
        } finally {
            setLoading(false);
        }
    }

    const updateOrderStatus = async(
        orderId: string,
        order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
        setError(null)
        setLoading(true)
        try {
            const token = store.getState().user.user?.tokens.access.token as string;
            const data = await updateOrderStatusRequest(token, orderId, order_status);
            if (data) {
                console.log("sending notification to user with fcm token:", data);
                const notification = await sendOrderStatusNotification(data.data?.updatedOrder.user.fcmToken,order_status);
                console.log("Notification response:", notification);
            }
            dispatch(updateOrders(data.data?.updatedOrder));
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to update order status')
        } finally {
            setLoading(false);
        }
    }

    

    return { error, loading, fetchAllOrders, updateOrderStatus }
}

export default useOrder;
