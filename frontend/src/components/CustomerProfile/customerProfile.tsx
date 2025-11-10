"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconShield,
  IconSettings,
  IconHeartHandshake,
  IconAlertCircle,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import useAuth from "@/hooks/userAuth";

export default function CustomerProfile() {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user?.user);
  const { completeProfile, isLoading } = useAuth();

  const personalInfoAvailable = user?.email && user?.phone;
  const addressAvailable = user?.address?.city || user?.address?.country;
  const profileComplete = personalInfoAvailable && addressAvailable;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      subcity: user?.address?.subcity || "",
      city: user?.address?.city || "",
      country: user?.address?.country || "",
    },
  });

  const formattedDate = (joinedDate: string) => {
    const date = new Date(joinedDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["subcity", "city", "country"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    await completeProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: {
        subcity: user?.address?.subcity || "",
        city: user?.address?.city || "",
        country: user?.address?.country || "",
      },
    });
  };

  return (
    <div className="p-8 w-full space-y-10 bg-gradient-to-b from-amber-50 via-white to-white rounded-2xl shadow-sm">
      {/* Profile Header */}
      <Card className="relative border-none bg-white/70 backdrop-blur-md rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-md"
            >
              <Image
                src="https://i.pravatar.cc/150?img=8"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </motion.div>

            <div>
              {editing ? (
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="text-lg font-semibold"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">
                  {user?.fullName}
                </h2>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Member since {formattedDate(user?.createdAt)}
              </p>
              <Badge className="mt-2 bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 font-semibold">
                🌟 Gold Member
              </Badge>
            </div>
          </div>

          {profileComplete ? (
            editing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-1 border-gray-300"
                >
                  <IconX size={16} /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600"
                >
                  <IconCheck size={16} /> {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
              >
                <IconEdit size={18} /> Edit Profile
              </Button>
            )
          ) : (
            <Button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:opacity-90"
            >
              Complete Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Information Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <AnimatedInfoCard
          title="Personal Information"
          icon={<IconUser size={20} className="text-amber-600" />}
        >
          {profileComplete ? (
            editing ? (
              <>
                <Input name="email" value={formData.email} disabled />
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <InfoRow icon={<IconMail />} text={user?.email} />
                <InfoRow icon={<IconPhone />} text={user?.phone} />
              </>
            )
          ) : (
            <EmptyProfileState onClick={() => setOpen(true)} />
          )}
        </AnimatedInfoCard>

        {/* Address */}
        <AnimatedInfoCard
          title="Shipping Address"
          icon={<IconMapPin size={20} className="text-green-600" />}
        >
          {profileComplete ? (
            editing ? (
              <>
                <Input
                  name="subcity"
                  value={formData.address.subcity}
                  onChange={handleChange}
                  placeholder="Subcity"
                />
                <Input
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                <Input
                  name="country"
                  value={formData.address.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {user?.address?.city}, {user?.address?.subcity}
                <br />
                {user?.address?.country}
              </p>
            )
          ) : (
            <EmptyProfileState onClick={() => setOpen(true)} />
          )}
        </AnimatedInfoCard>
      </div>

      {/* Dialog for Completing Profile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Complete Your Profile
            </DialogTitle>
          </DialogHeader>
          <ProfileForm email={user?.email} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Preferences */}
      <AnimatedInfoCard
        title="Art Preference & Culture"
        icon={<IconHeartHandshake size={20} className="text-rose-600" />}
      >
        <p className="text-sm text-gray-600 mb-2">
          You love Ethiopian culture & handcrafted items.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-rose-100 text-rose-700">Traditional Weaving</Badge>
          <Badge className="bg-amber-100 text-amber-800">Ceramics</Badge>
          <Badge className="bg-indigo-100 text-indigo-700">Wood Crafts</Badge>
        </div>
      </AnimatedInfoCard>

      {/* Security & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedInfoCard
          title="Security Settings"
          icon={<IconShield size={20} className="text-blue-600" />}
        >
          <Button variant="outline" className="w-full border-gray-300">
            Change Password
          </Button>
        </AnimatedInfoCard>

        <AnimatedInfoCard
          title="Account Settings"
          icon={<IconSettings size={20} className="text-gray-700" />}
        >
          <Button variant="outline" className="w-full border-gray-300">
            Notification Preferences
          </Button>
        </AnimatedInfoCard>
      </div>
    </div>
  );
}

/* ========== Subcomponents ========== */

function AnimatedInfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <Card className="border bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            {icon} {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      {icon} {text}
    </div>
  );
}

function EmptyProfileState({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50"
    >
      <IconAlertCircle size={32} className="text-gray-400 mb-2" />
      <p className="text-gray-600 text-sm mb-3">
        Your profile is incomplete. Add your details to continue.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
      >
        Complete Profile
      </Button>
    </motion.div>
  );
}

function ProfileForm({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    phone: "",
    address: { subcity: "", city: "", country: "" },
  });
  const { completeProfile, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["subcity", "city", "country"].includes(name)) {
      setFormData({ ...formData, address: { ...formData.address, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await completeProfile(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="email" value={email} disabled />
      <Input name="phone" placeholder="Phone" onChange={handleChange} required />
      <Input name="subcity" placeholder="Subcity" onChange={handleChange} required />
      <Input name="city" placeholder="City" onChange={handleChange} required />
      <Input name="country" placeholder="Country" onChange={handleChange} required />
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
