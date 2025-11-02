"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditUserModal from "./EditUserModal";
import NotifyUserModal from "./NotifyUserModal";

const demoUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@startup.com",
    avatar: "/avatar1.png",
    role: "Admin",
    status: "Active",
    createdAt: "2024-09-23"
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@founderhub.com",
    avatar: "/avatar2.png",
    role: "User",
    status: "Suspended",
    createdAt: "2024-10-01"
  },
];

export default function UserManager() {
  const [users, setUsers] = useState(demoUsers);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const selectedUser = users.find(u => u.id === selectedUserId);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Suspended" } : u))
    );
  };

  const handleActivate = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 overflow-y-auto w-full px-20"
    >
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: "1,284" },
          { title: "Active", value: "1,120" },
          { title: "Suspended", value: "164" },
          { title: "New This Month", value: "84" },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stat.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search users by name or email..."
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Action Bar */}
{selectedUserId && (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-gray-900/70 shadow-sm border backdrop-blur-md mb-4"
  >
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
      {selectedUser?.name} selected
    </div>

    <div className="ml-auto flex gap-2">
      <EditUserModal user={selectedUser!} />
      <NotifyUserModal user={selectedUser!} />

      {selectedUser?.status === "Active" ? (
        <Button
          variant="destructive"
          className="rounded-lg"
          onClick={() => handleSuspend(selectedUserId)}
        >
          Suspend
        </Button>
      ) : (
        <Button
          className="rounded-lg bg-green-600 hover:bg-green-700"
          onClick={() => handleActivate(selectedUserId)}
        >
          Reactivate
        </Button>
      )}

      <Button
        variant="ghost"
        className="rounded-lg text-gray-500"
        onClick={() => setSelectedUserId(null)}
      >
        Clear
      </Button>
    </div>
  </motion.div>
)}



      {/* Users Table */}
      <Card className="border shadow-sm">
  <CardHeader>
    <CardTitle className="font-semibold tracking-tight text-lg">
      User Directory
    </CardTitle>
    <p className="text-sm text-gray-500">Manage platform users and roles</p>
  </CardHeader>

  <CardContent>
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((user) => {
            const isSelected = selectedUserId === user.id;
            return (
              <motion.tr
                key={user.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`cursor-pointer transition-all
                  ${isSelected ? "bg-indigo-50 dark:bg-indigo-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}
                `}
                onClick={() =>
                  setSelectedUserId(isSelected ? null : user.id)
                }
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={() =>
                      setSelectedUserId(isSelected ? null : user.id)
                    }
                  />
                </TableCell>

                <TableCell className="flex items-center gap-3 py-3">
                  <Image
                    alt={user.name}
                    src={user.avatar}
                    width={40}
                    height={40}
                    className="rounded-full shadow-sm"
                  />
                  <div className="font-medium">{user.name}</div>
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-300">
                  {user.email}
                </TableCell>

                <TableCell>
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-md px-2 py-1 text-xs">
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    className={`rounded-md  px-2 py-1 text-xs ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-500 text-sm">
                  {user.createdAt}
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>
    </motion.div>
  );
}
