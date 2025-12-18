import { getAllUsers, toggleActivateUser } from '@/api/user/userAPI'
import { setCustomers, updateCustomer } from '@/store/feature/user/customersSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const useCustomer = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    const fetchAllCustomers = async() => {
        setError(null)
        setLoading(true);
        try {
            const data = await getAllUsers();
            console.log("users: ", data);
            dispatch(setCustomers(data));
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Failed to fetch users";
            setError(message)
        } finally {
            setLoading(false);
        }
    }

    const toggleActivateCustomer = async(userId: string) => {
        setError(null)
        setLoading(true)
        try {
            const data = await toggleActivateUser(userId);
            console.log("user activated or deactivated: ", data.user);
            dispatch(updateCustomer(data.user));
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Failed to activate or deactivate user";
            setError(message)
         } finally {
            setLoading(false);
         }
    }

    

    return { error, loading, fetchAllCustomers, toggleActivateCustomer }
}

export default useCustomer;
