"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditUserModal from "./EditUserModal";
import NotifyUserModal from "./NotifyUserModal";
import { ArtisansResponse } from "@/types/artisan";
import { User } from "@/types/user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* ------------------------------------------------------------------ */
/*  Helper – a tiny “adapter” that normalises the two shapes            */
/* ------------------------------------------------------------------ */
type Entity = User | ArtisansResponse;

export interface NormalisedEntity {
  id: string;
  name: string;
  email?: string;          // only Users have email
  avatar: string;
  role: string;
  status: "active" | "suspended";
  createdAt: string;
}

/** Convert any Entity → NormalisedEntity */
function normalise(e: Entity, entityType: "customer" | "artisan"): NormalisedEntity {
  const base = {
    id: e._id,
    name: e.fullName,
    createdAt: e.createdAt,
    // default to Active – you can add a real `status` field later
    status: e.status
  };

  if (entityType === "customer") {
    const u = e as User;
    return {
      ...base,
      email: u.email,
      avatar: "/default-avatar.png", // you can store avatars in User later
      role: u.role,
      status: u.status,
    };
  }

  // artisan
  const a = e as ArtisansResponse;
  return {
    ...base,
    email: undefined,
    avatar: a.profilePic,
    role: "Artisan",
    status: a.status
  };
}

/* ------------------------------------------------------------------ */
/*  Props – now generic                                                */
/* ------------------------------------------------------------------ */
interface UserManagerProps<T extends Entity> {
  /** "customer" | "artisan" – decides UI copy & normalisation */
  role: "customer" | "artisan";
  /** The actual list coming from the server */
  users?: T[];
  onToggleActivate: (userId: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function UserManager<T extends Entity>({
  role,
  users: serverUsers = [],
  onToggleActivate,
}: UserManagerProps<T>) {
  const [normalised, setNormalised] = useState<NormalisedEntity[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ADD: Confirmation dialog state
  const [confirmAction, setConfirmAction] = useState<"suspend" | "reactivate" | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  /* Sync normalised state whenever serverUsers or role changes */
  useEffect(() => {
    if (serverUsers && Array.isArray(serverUsers)) {
      setNormalised(serverUsers.map((u) => normalise(u, role)));
    } else {
      setNormalised([]);
    }
  }, [serverUsers, role]);

  /* Find the *original* entity for modals */
  const selectedOriginal = serverUsers.find((u) => u._id === selectedId);
  const selectedNormalised = normalised.find((n) => n.id === selectedId);

  /* ---------------------------------------------------------------- */
  /*  Filtering                                                       */
  /* ---------------------------------------------------------------- */
  const filtered = normalised.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      (u.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  /* ---------------------------------------------------------------- */
  /*  Toggle with Confirmation                                        */
  /* ---------------------------------------------------------------- */
  const requestToggle = (userId: string) => {
    const user = normalised.find((u) => u.id === userId);
    if (!user) return;

    setPendingUserId(userId);
    setConfirmAction(user.status === "active" ? "suspend" : "reactivate");
  };

  const handleConfirmToggle = () => {
    if (pendingUserId) {
      onToggleActivate(pendingUserId);
      // Optional: optimistic update
      // setNormalised(prev => prev.map(u =>
      //   u.id === pendingUserId
      //     ? { ...u, status: u.status === "active" ? "suspended" : "active" }
      //     : u
      // ));
    }
    setConfirmAction(null);
    setPendingUserId(null);
  };

  const handleCancelToggle = () => {
    setConfirmAction(null);
    setPendingUserId(null);
  };

  /* ---------------------------------------------------------------- */
  /*  UI                                                               */
  /* ---------------------------------------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 overflow-y-auto w-full px-20"
    >
      {/* ---------- Analytics Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: `Total ${role === "customer" ? "Customers" : "Artisans"}`,
            value: serverUsers?.length.toLocaleString(),
          },
          {
            title: "Active",
            value: normalised
              ?.filter((u) => u.status === "active")
              .length.toLocaleString(),
          },
          {
            title: "Suspended",
            value: normalised
              ?.filter((u) => u.status === "suspended")
              .length.toLocaleString(),
          },
          { title: "New This Month", value: "–" },
        ].map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* ---------- Search ---------- */}
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder={`Search ${role === "customer" ? "customers" : "artisans"} by name or email…`}
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ---------- Action Bar (appears when a row is selected) ---------- */}
      {selectedId && selectedOriginal && selectedNormalised &&(
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-gray-900/70 shadow-sm border backdrop-blur-md mb-4"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            {selectedOriginal.fullName} selected
          </div>

          <div className="ml-auto flex gap-2">
            {role === "artisan" && <EditUserModal user={selectedOriginal} />}
            <NotifyUserModal user={selectedOriginal} />

            {selectedNormalised.status === "active" ? (
              <Button
                variant="destructive"
                className="rounded-lg"
                onClick={() => requestToggle(selectedId)}
              >
                Suspend
              </Button>
            ) : (
              <Button
                className="rounded-lg bg-green-600 hover:bg-green-700"
                onClick={() => requestToggle(selectedId)}
              >
                Reactivate
              </Button>
            )}

            <Button
              variant="ghost"
              className="rounded-lg text-gray-500"
              onClick={() => setSelectedId(null)}
            >
              Clear
            </Button>
          </div>
                  </motion.div>
                )}

      {/* ---------- Table ---------- */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-lg">
            {role === "customer" ? "Customer" : "Artisan"} Directory
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
                  {role === "customer" && <TableHead>Email</TableHead>}
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered?.map((u) => {
                  const isSelected = selectedId === u.id;
                  return (
                    <motion.tr
                      layout
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`cursor-pointer transition-all
                        ${isSelected
                          ? "bg-indigo-50 dark:bg-indigo-900/30"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}
                      `}
                      onClick={() => setSelectedId(isSelected ? null : u.id)}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={() => setSelectedId(isSelected ? null : u.id)}
                        />
                      </TableCell>

                      <TableCell className="flex items-center gap-3 py-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        alt={u.name}
                        src={u.avatar}
                        fill
                        sizes="40px"
                        className="rounded-full object-cover shadow-sm"
                      />
                    </div>
                        <div className="font-medium">{u.name}</div>
                      </TableCell>

                      {role === "customer" && (
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          {u.email}
                        </TableCell>
                      )}

                      <TableCell>
                        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-md px-2 py-1 text-xs">
                          {u.role}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`rounded-md px-2 py-1 text-xs ${
                            u.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {u.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-gray-500 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* ---------- Confirmation Dialog ---------- */}
      <AlertDialog open={!!confirmAction} onOpenChange={() => handleCancelToggle()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === "suspend" ? "Suspend" : "Reactivate"} User
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              <strong>
                {confirmAction === "suspend" ? "suspend" : "reactivate"}
              </strong>{" "}
              <strong>{selectedOriginal?.fullName}</strong>?
              <br />
              {confirmAction === "suspend"
                ? "They will lose access to the platform."
                : "They will regain access to the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelToggle}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmToggle}
              className={
                confirmAction === "suspend"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            >
              {confirmAction === "suspend" ? "Suspend" : "Reactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}