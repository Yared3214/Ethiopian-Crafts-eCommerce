"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "./EditUserModal";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Bell } from "lucide-react";

export default function NotifyUserModal({ user }: { user: User }) {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition"
        >
          <Bell size={18} /> Notify
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6 rounded-xl border border-indigo-200/60">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Bell className="text-indigo-600" size={20} /> Notify {user.name}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Send an important announcement or reminder to this user.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="Subject"
            className="w-full focus:ring-2 focus:ring-indigo-500 transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] resize-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={sendNotification}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2"
            disabled={loading || (!message && !subject)}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Sending...
              </>
            ) : (
              <>Send Notification</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
