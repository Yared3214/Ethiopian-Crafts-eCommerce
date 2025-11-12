"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import store from "@/store/store";

interface CheckoutPaymentData {
  checkout_url?: string;
}

interface CheckoutPayment {
  status: string;
  message?: string;
  data?: CheckoutPaymentData;
}

interface CheckoutResponse {
  message: string;
  payment?: CheckoutPayment;
  orderId?: string;
}

const useCheckout = () => {
  const token = store.getState().user.user?.tokens.access.token || null;

  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Trigger checkout
   */
  const checkoutHandler = async (): Promise<CheckoutResponse | undefined> => {
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<CheckoutResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Checkout response:", response.data);

      const checkoutUrl = response.data.payment?.data?.checkout_url;
      if (checkoutUrl) {
        setPaymentUrl(checkoutUrl);
        window.open(checkoutUrl, "_blank"); // Open Chapa hosted payment link
      } else {
        setError(response.data.message || "Checkout URL not found.");
      }

      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;

      if (axiosError.response) {
        setError(
          axiosError.response.data?.message ||
            "Something went wrong with the request."
        );
      } else if (axiosError.request) {
        setError("No response received from the server.");
      } else {
        setError(axiosError.message || "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkoutHandler,
    paymentUrl,
    isLoading,
    error,
  };
};

export default useCheckout;
