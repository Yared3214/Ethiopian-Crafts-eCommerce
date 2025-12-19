"use client"

import { useToast } from "@/hooks/use-toast"

export function useAppToast() {
  const { toast } = useToast()

  const showSuccessToast = (message = "Your message has been sent.") => {
    toast({
      description: message,
      className: "bg-green-500 text-white",
    })
  }

  const showErrorToast = (message = "Something went wrong.") => {
    toast({
      description: message,
      className: "bg-red-500 text-white",
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}
