"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCircle, Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { User } from "@/types/user";
import { ArtisansResponse } from "@/types/artisan";
import useArtisan from "@/hooks/useArtisan";

// ------------------------------------------------------------------
// Type guard
// ------------------------------------------------------------------
function isUser(user: User | ArtisansResponse): user is User {
  return "email" in user;
}

interface EditUserModalProps {
  user: User | ArtisansResponse;
}

// ------------------------------------------------------------------
// Helper to get current avatar URL (local preview or remote)
// ------------------------------------------------------------------
function getCurrentAvatar(form: User | ArtisansResponse, previewUrl?: string) {
  if (previewUrl) return previewUrl;
  if (isUser(form)) return (form as User).avatar || null;
  return form.profilePic || null;
}

export default function EditUserModal({ user }: EditUserModalProps) {
  const [form, setForm] = useState<User | ArtisansResponse>(user);
  const [open, setOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateArtisanHandler, loading, error } = useArtisan();

  const isArtisan = !isUser(form);

  // RESET FORM + PREVIEW WHEN MODAL OPENS OR USER CHANGES
  useEffect(() => {
    if (open) {
      setForm(user);           // ← Reset to current user
      setAvatarPreview(undefined); // ← Clear old preview
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, user]);

  // --------------------------------------------------------------
  // Open file picker
  // --------------------------------------------------------------
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // --------------------------------------------------------------
  // Handle file selection → create preview
  // --------------------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    // Optional: validate file type / size
    if (!image.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (image.size > 5 * 1024 * 1024) {
      // 5 MB limit
      alert("Image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarPreview(result);

      // Store the file in form state (you can later send it to API)
      setForm((prev) => ({
        ...prev,
        // We'll keep a `file` field for upload later
        // @ts-ignore – we add a temporary property
        image,
      }));
    };
    reader.readAsDataURL(image);
  };

  const handleSave = async () => {
    if (!isArtisan) {
      setOpen(false);
      return;
    }
  
    const uploadedFile = (form as any).image as File | undefined;
  
    try {
      if (uploadedFile) {
        const formData = new FormData();
        formData.append("profilePic", uploadedFile); // ← MATCHES BACKEND
        formData.append("fullName", form.fullName);
        formData.append("description", form.description);
  
        await updateArtisanHandler(form.slug, formData);
      } else {
        const artisanData: Partial<ArtisansResponse> = {
          fullName: form.fullName,
          description: form.description,
        };
        await updateArtisanHandler(form.slug, artisanData);
      }
    } catch (err: any) {
      console.error("Update failed:", err.message);
    } finally {
      setOpen(false);
    }
  };

  const currentAvatar = getCurrentAvatar(form, avatarPreview);

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
            Edit {isArtisan ? "Artisan" : "User"} Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ---------- Avatar ---------- */}
          <div className="flex items-center gap-4">
            {currentAvatar ? (
              <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                alt={form.fullName}
                src={currentAvatar}
                fill
                sizes="40px"
                className="rounded-full object-cover shadow-sm"
              />
            </div>
            ) : (
              <UserCircle className="h-16 w-16 text-gray-400" />
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={openFilePicker}
            >
              <Upload className="h-4 w-4 mr-2" />
              Change Avatar
            </Button>
          </div>

          {/* ---------- Full Name ---------- */}
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value } as User | ArtisansResponse)
              }
              placeholder="Full name"
              className="rounded-lg"
            />
          </div>

          {/* ---------- Email (Users only) ---------- */}
          {isUser(form) && (
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value } as User)
                }
                placeholder="user@example.com"
                className="rounded-lg"
              />
            </div>
          )}

          {/* ---------- Role (Users only) ---------- */}
          {isUser(form) && (
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(value) =>
                  setForm({ ...form, role: value } as User)
                }
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* ---------- Description (Artisans only) ---------- */}
          {isArtisan && (
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value } as ArtisansResponse)
                }
                placeholder="Brief bio or craft description"
                className="rounded-lg"
              />
            </div>
          )}

          {/* ---------- Slug (Artisans only) ---------- */}
          {isArtisan && (
            <div className="space-y-1.5">
              <Label>Slug (URL)</Label>
              <Input
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value } as ArtisansResponse)
                }
                placeholder="unique-artisan-name"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* ---------- Footer ---------- */}
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