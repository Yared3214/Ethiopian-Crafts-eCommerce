"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useProduct from "@/hooks/useProduct";
import ProductList from "../products/ProductList";
import { IconPackage, IconClockHour4, IconHeart, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { getAllUserOrdersRequest } from "@/api/order/orderAPI";
import { cn } from "@/lib/utils";

// -----------------------------
// Types
// -----------------------------
type OrderItem = {
  ProductItem: string;
  ProductName?: string;
  productImage?: string;
  price?: number;
  quantity: number;
};

type Order = {
  _id: string;
  OrderItems: OrderItem[];
  total_price: number;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

// -----------------------------
// Status Styles
// -----------------------------
const statusStyle = {
  pending: { label: "Pending", gradient: "bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900" },
  processing: { label: "Processing", gradient: "bg-gradient-to-r from-blue-400 to-blue-600 text-blue-50" },
  shipped: { label: "Shipped", gradient: "bg-gradient-to-r from-indigo-400 to-indigo-600 text-indigo-50" },
  delivered: { label: "Delivered", gradient: "bg-gradient-to-r from-green-400 to-green-600 text-green-50" },
  cancelled: { label: "Cancelled", gradient: "bg-gradient-to-r from-rose-400 to-rose-600 text-rose-50" },
};

// -----------------------------
// Main Component
// -----------------------------
export default function CustomerDashboardContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const { fetchProductsHandler, toggleSavingProductHandler, getUserSavedProductsHandler, loading: loadingProducts } = useProduct();
  const products = useSelector((state: RootState) => state.product.products);
  const savedProducts = useSelector((state: RootState) => state.savedProduct.savedProducts);

  // -----------------------------
  // Fetch Orders
  // -----------------------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllUserOrdersRequest();
        setOrders(res.data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  // -----------------------------
  // Fetch Products & Saved Products
  // -----------------------------
  useEffect(() => {
    if (products.length === 0) fetchProductsHandler();
    if (savedProducts.length === 0) getUserSavedProductsHandler();
  }, []);

  // -----------------------------
  // Stats Computation
  // -----------------------------
  const stats = useMemo(() => {
    return {
      totalOrders: orders.length,
      activeOrders: orders.filter((o) => o.order_status !== "delivered").length,
      savedCount: savedProducts.length,
    };
  }, [orders, savedProducts]);

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <div className="h-full w-full p-6 space-y-8 overflow-y-auto bg-gradient-to-b from-white to-stone-50 dark:from-neutral-900 dark:to-neutral-950">

      {/* ----------------------------- Stats Cards ----------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Total Orders", value: stats.totalOrders, icon: <IconPackage className="w-5 h-5 text-indigo-600" /> },
          { label: "Active Orders", value: stats.activeOrders, icon: <IconClockHour4 className="w-5 h-5 text-amber-500" /> },
          { label: "Saved Items", value: stats.savedCount, icon: <IconHeart className="w-5 h-5 text-rose-500" /> },
        ].map((s, i) => (
          <Card key={i} className="shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              {s.icon}
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-extrabold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* ----------------------------- Recent Orders ----------------------------- */}
      <Card className="shadow-lg bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg font-extrabold flex items-center justify-between">
            Recent Orders
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loadingOrders ? (
            <div className="p-10 text-center text-gray-500 animate-pulse">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">You have no orders yet.</div>
          ) : (
            orders.map((order) => {
              const firstItem = order.OrderItems[0];
              const status = statusStyle[order.order_status];
              const placedAt = new Date(order.createdAt).toLocaleDateString();
              const formattedPrice = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" }).format(order.total_price);

              const productNames = order.OrderItems.map((i) => i.ProductName).filter(Boolean).join(", ");

              return (
                <motion.div
                  key={order._id}
                  layout
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="cursor-pointer"
                >
                  <Card className="relative bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />

                    <CardContent className="p-5 space-y-3">
                      {/* Header */}
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-extrabold text-gray-900 line-clamp-1">{firstItem?.ProductName}</h3>
                          <p className="text-sm text-gray-700 line-clamp-1" title={productNames}>{productNames}</p>
                          <p className="text-sm text-gray-500 mt-1">{order.OrderItems.length} item{order.OrderItems.length > 1 ? "s" : ""} • Placed on {placedAt}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={cn("px-3 py-1 rounded-full font-semibold shadow-md", status.gradient)}>{status.label}</Badge>
                          <span className="text-indigo-600 font-bold text-lg">{formattedPrice}</span>
                        </div>
                      </div>

                      {/* Toggle Details */}
                      <button
                        className="flex justify-between items-center w-full mt-3 py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium"
                        onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                      >
                        {expandedOrderId === order._id ? "Hide Details" : "View Order"}
                        {expandedOrderId === order._id ? <IconChevronUp /> : <IconChevronDown />}
                      </button>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {expandedOrderId === order._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-3 max-h-80 overflow-y-auto"
                          >
                            {order.OrderItems.map((item, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-4 p-3 bg-white/50 backdrop-blur-md rounded-xl shadow-md hover:scale-[1.01] transition-transform"
                              >
                                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                                  <Image
                                    src={item.productImage || "https://via.placeholder.com/64"}
                                    alt={item.ProductName || "Product"}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">{item.ProductName}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <span className="font-bold text-indigo-600">
                                  {new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 2 }).format(item.price || 0)}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* ----------------------------- Recommended / Saved Products ----------------------------- */}
      <Card className="shadow-lg bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg font-extrabold">Recommended For You</CardTitle>
        </CardHeader>

        <ProductList products={products} toggleSaveProduct={toggleSavingProductHandler} loading={loadingProducts} />
      </Card>
    </div>
  );
}
