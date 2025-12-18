"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Search, Package, Truck, CheckCircle, XCircle, AlertCircle, ChevronDown, Download, Printer } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import useOrder from "@/hooks/useOrder";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Order } from "@/api/order/orderAPI";

export default function ManageOrders() {
  // const [orders] = useState<Order[]>(sampleOrders);
  const { fetchAllOrders, updateOrderStatus, error, loading } = useOrder();
  const orders = useSelector((state: RootState) => state.order.orders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusChange, setStatusChange] = useState<{ id: string; status: Order['order_status'] } | null>(null);

  useEffect(() => {
        if (!orders || orders.length === 0) {
          fetchAllOrders();
        }
      }, [orders, fetchAllOrders]);

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.user?.fullName.toLowerCase().includes(search.toLowerCase()) ||
        order.user?.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedOrders);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedOrders(newSet);
  };

  const selectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filteredOrders.map((o) => o._id)));
    }
  };

  const getStatusIcon = (status: Order['order_status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['order_status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const handleUpdateStatus = async(
    orderId: string, 
    order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
      await updateOrderStatus(orderId, order_status);
  };

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
          <p className="text-muted-foreground">Track and fulfill customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total Orders', value: orders.length, icon: Package },
            { label: 'Pending', value: orders.filter(o => o.order_status === 'pending').length, icon: AlertCircle, color: 'text-yellow-600' },
            { label: 'Processing', value: orders.filter(o => o.order_status === 'processing').length, icon: Package, color: 'text-blue-600' },
            { label: 'Delivered', value: orders.filter(o => o.order_status === 'delivered').length, icon: CheckCircle, color: 'text-green-600' },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color || 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by order ID, name, or email..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {selectedOrders.size > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel Selected
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedOrders.size === filteredOrders.length && filteredOrders.length > 0}
                        onChange={selectAll}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order._id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedOrders.has(order._id)}
                          onChange={() => toggleSelect(order._id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order._id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.user.fullName}</p>
                          <p className="text-sm text-muted-foreground">{order.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.OrderItems.reduce((sum, i) => sum + i.quantity, 0)}</TableCell>
                      <TableCell className="font-semibold">${order.total_price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Select
                          value={order.order_status}
                          onValueChange={(value) => setStatusChange({ id: order._id, status: value as Order['order_status'] })}
                        >
                          <SelectTrigger className={`w-32 h-8 ${getStatusColor(order.order_status)}`}>
                            <SelectValue>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.order_status)}
                                <span className="capitalize">{order.order_status}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Order Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order {selectedOrder._id}</DialogTitle>
                <DialogDescription>
                  Placed on {format(new Date(selectedOrder.createdAt), 'MMMM dd, yyyy')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer & Shipping */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Customer</h4>
                    <p>{selectedOrder.user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.user.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p>{selectedOrder.user.address.subcity}</p>
                    <p>{selectedOrder.user.address.city}, {selectedOrder.user.address.country}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold mb-3">Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.OrderItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productName || 'Product'}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="bg-muted rounded-md w-16 h-16" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.productName || 'Unnamed Product'}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ${item.price?.toFixed(2) || 'N/A'}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${(item.quantity * (item.price || 0)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-lg font-semibold">Total: ${selectedOrder.total_price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" /> Print Invoice
                  </Button>
                  <Button>Mark as Shipped</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Change Confirmation */}
      <AlertDialog open={!!statusChange} onOpenChange={() => setStatusChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Order Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this order status to{' '}
              <strong className="capitalize">{statusChange?.status}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
            onClick={async () => {
              if (statusChange?.id) {
                await handleUpdateStatus(statusChange.id, statusChange.status);
                setStatusChange(null); // close manually AFTER update completes
              }
            }}
          >
            {loading ? "Updating..." : "Confirm"}
          </Button>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}