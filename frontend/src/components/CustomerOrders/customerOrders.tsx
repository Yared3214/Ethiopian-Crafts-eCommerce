"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTruck, IconBox, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Order = {
  id: string;
  title: string;
  artisan: string;
  region: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  progress: number;
  price: string;
  image: string;
  placedAt: string;
};

const demoOrders: Order[] = [
  {
    id: "ORD-1001",
    title: "Handwoven Cotton Scarf",
    artisan: "Sara Weaves",
    region: "Gonder",
    status: "Processing",
    progress: 25,
    price: "ETB 420",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=60",
    placedAt: "2025-03-12",
  },
  {
    id: "ORD-1002",
    title: "Clay Coffee Jebena",
    artisan: "Addis Clay Studio",
    region: "Bale",
    status: "Shipped",
    progress: 70,
    price: "ETB 1,200",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoqjyN0G1GKi8FnVO8OGzJXB1b5emGAF43xQ&s",
    placedAt: "2025-03-03",
  },
  {
    id: "ORD-1003",
    title: "Traditional Silver Earrings",
    artisan: "Lalibela Silver House",
    region: "Lalibela",
    status: "Delivered",
    progress: 100,
    price: "ETB 950",
    image: "https://m.media-amazon.com/images/I/917WyU32T3L._AC_UY1100_.jpg",
    placedAt: "2025-02-20",
  },
];

const statusColor = {
  Processing: "bg-yellow-200 text-yellow-800",
  Shipped: "bg-blue-200 text-blue-800",
  Delivered: "bg-green-200 text-green-700",
  Cancelled: "bg-red-200 text-red-700",
};

const statusIcon = {
  Processing: <IconClock size={16} />,
  Shipped: <IconTruck size={16} />,
  Delivered: <IconCircleCheck size={16} />,
  Cancelled: <IconBox size={16} />,
};

export default function PurchasedProducts() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {demoOrders.map((item) => (
        <Card
          key={item.id}
          className="border bg-white/90 backdrop-blur-xl shadow-md hover:shadow-lg transition-all rounded-xl"
        >
          <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <span className="text-sm font-medium text-gray-500">{item.price}</span>
            </div>

            <p className="text-sm text-gray-500">
              By {item.artisan} — {item.region}
            </p>

            <div className="flex items-center gap-2">
              <Badge className={cn("flex items-center gap-1", statusColor[item.status])}>
                {statusIcon[item.status]} {item.status}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Order ID: {item.id}</span>
              <span>{item.placedAt}</span>
            </div>

            <Button className="w-full mt-2" variant="outline">
              View Order
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
}
