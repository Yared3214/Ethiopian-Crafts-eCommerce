"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconClockHour4,
  IconHeart,
  IconPackage,
  IconArrowRight,
} from "@tabler/icons-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
};

const demoOrders: Order[] = [
  {
    id: "ORD-1001",
    title: "Handwoven Cotton Scarf",
    artisan: "Sara Weaves",
    region: "Gonder",
    status: "Processing",
    progress: 40,
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
];

const demoSaved: Product[] = [
  {
    id: "P-1",
    title: "Handmade Pottery Vase",
    price: "ETB 980",
    image:
      "https://www.themudplace.com/cdn/shop/files/preview_images/2f4e88d9033c4b55a07b500bf6b80950.thumbnail.0000000000_1200x1200.jpg?v=1691106391",
    category: "Pottery",
  },
  {
    id: "P-2",
    title: "Silk Scarf - Traditional Pattern",
    price: "ETB 650",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUeCSQx8_vMRdlRco9cSwzzovIeAeneVfA_Q&s",
    category: "Textiles",
  },
];

export default function CustomerDashboardContent() {
  const [orders] = useState<Order[]>(demoOrders);
  const [saved] = useState<Product[]>(demoSaved);

  const stats = useMemo(() => {
    return {
      totalOrders: orders.length,
      activeOrders: orders.filter((o) => o.status !== "Delivered").length,
      savedCount: saved.length,
    };
  }, [orders, saved]);

  return (
    <div className="h-full w-full p-6 space-y-8 overflow-y-auto bg-gradient-to-b from-white to-stone-50 dark:from-neutral-900 dark:to-neutral-950">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Total Orders", value: stats.totalOrders, icon: <IconPackage className="w-5 h-5 text-indigo-600" /> },
          { label: "Active Orders", value: stats.activeOrders, icon: <IconClockHour4 className="w-5 h-5 text-amber-500" /> },
          { label: "Saved Items", value: stats.savedCount, icon: <IconHeart className="w-5 h-5 text-rose-500" /> },
        ].map((s, i) => (
          <Card key={i} className="shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              {s.icon}
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Orders */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            Recent Orders
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <IconArrowRight className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {orders.map((order) => (
            <div key={order.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800/40 transition-all">

              <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm">
                <Image src={order.image} alt={order.title} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="font-medium">{order.title}</div>
                <div className="text-sm text-gray-500">{order.artisan} — {order.region}</div>

                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    className={
                      order.status === "Shipped" ? "bg-blue-500" :
                      order.status === "Processing" ? "bg-amber-500" :
                      "bg-green-600"
                    }
                  >
                    {order.status}
                  </Badge>
                  <span className="text-xs opacity-60">{order.price}</span>
                </div>

                <Progress value={order.progress} className="mt-2 h-2" />
              </div>
            </div>
          ))}

        </CardContent>
      </Card>

      {/* Recommended / Saved */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recommended For You</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {demoSaved.map((p) => (
            <div key={p.id} className="rounded-lg overflow-hidden border bg-white dark:bg-neutral-900 hover:shadow-md transition-all">

              <div className="relative h-40 w-full">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>

              <div className="p-3 space-y-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">{p.category}</div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="font-semibold text-sm">{p.price}</div>

                  <Button variant="ghost" size="icon">
                    <IconHeart className="w-5 h-5 text-rose-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
