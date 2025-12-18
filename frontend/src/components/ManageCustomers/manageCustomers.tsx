import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserManager from "../UserManager/userManager";
import useCustomer from "@/hooks/useCustomer";
import { useEffect } from "react";

export default function ManageCustomers() {
    const { fetchAllCustomers, toggleActivateCustomer, loading, error } = useCustomer();
    const customers = useSelector((state: RootState) => state.customer.customers,
    shallowEqual); // from cookie (AuthResponse.user)

    useEffect(() => {
          if (!customers || customers.length === 0) {
            fetchAllCustomers();
          }
        }, [customers, fetchAllCustomers]);
    return(
        <div>
            <UserManager onToggleActivate={toggleActivateCustomer} role={'customer'} users={customers} />
        </div>
    )
}