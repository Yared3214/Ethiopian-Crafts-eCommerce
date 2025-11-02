"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCircle, Upload } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function EditUserModal({ user }: { user: User }) {
  const [form, setForm] = useState(user);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // Call API here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 rounded-xl shadow-xl border bg-white/90 backdrop-blur-xl dark:bg-gray-900/90">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            {form.avatar ? (
              <Image
                src={form.avatar}
                alt={form.name}
                width={64}
                height={64}
                className="rounded-full border shadow-sm"
              />
            ) : (
              <UserCircle className="h-16 w-16 text-gray-400" />
            )}

            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              <Upload className="h-4 w-4 mr-2" /> Change Avatar
            </Button>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="User name"
              className="rounded-lg"
            />
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(value) => setForm({ ...form, role: value })}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-lg"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
