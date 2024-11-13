"use client"

import { useToast } from "@/hooks/use-toast"

export function showSuccessToast() {
    const { toast } = useToast()
    toast({
        description: "Your message has been sent.",
        className: "bg-green-500 text-white" // Add custom colors here if needed
    })
}
