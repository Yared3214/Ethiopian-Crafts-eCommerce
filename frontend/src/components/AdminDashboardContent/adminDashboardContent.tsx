import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, Globe, TrendingUp, Award, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 200 },
  { month: "Mar", sales: 180 },
  { month: "Apr", sales: 250 },
  { month: "May", sales: 300 },
  { month: "Jun", sales: 400 },
];

const categoryData = [
  { name: "Textiles", value: 45 },
  { name: "Pottery", value: 30 },
  { name: "Jewelry", value: 15 },
  { name: "Woodcraft", value: 10 },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#db2777"]; 

const topProducts = [
  { name: "Handwoven Scarf", sales: 320 },
  { name: "Clay Coffee Pot (Jebena)", sales: 280 },
  { name: "Gold Earrings", sales: 220 },
];

const topArtisans = [
  { name: "Sara Ethiopian Weaving", sales: 540 },
  { name: "Addis Clay Studio", sales: 430 },
];

export default function AdminAnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6 w-full bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard Analytics</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: "1,245", change: "+80", icon: <Users /> },
          { title: "Total Products", value: "687", change: "+40", icon: <ShoppingBag /> },
          { title: "Global Visitors", value: "8,912", change: "+1,200", icon: <Globe /> },
          { title: "Revenue", value: "ETB 120K", change: "+25K", icon: <TrendingUp /> },
        ].map((stat, i) => (
          <Card key={i} className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change} this month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader><CardTitle>Monthly Sales</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader><CardTitle>Product Categories</CardTitle></CardHeader>
          <CardContent className="h-80 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Sellers & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex justify-between">
                <span>{p.name}</span>
                <span className="font-semibold">{p.sales} sales</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Artisans */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader><CardTitle>Top Artisans</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topArtisans.map((a, i) => (
              <div key={i} className="flex justify-between">
                <span>{a.name}</span>
                <span className="font-semibold">{a.sales} sales</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insight*/}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="flex items-center gap-2">
          <Activity />
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Sales have grown significantly due to increased international traffic. Textiles and pottery continue to lead in global demand.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="rounded-2xl px-6">Download Full Report</Button>
      </div>
    </div>
  );
}
