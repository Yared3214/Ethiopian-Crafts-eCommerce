"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";     
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import useAuth from "@/hooks/userAuth";

export default function CustomerProfile() {
  const [editing, setEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user.user?.user); // from cookie (AuthResponse.user)
  const [open, setOpen] = useState(false);

  const personalInfoAvailable = user?.email && user?.phone;
  const addressAvailable = user?.address?.city || user?.address?.country;
  const profileComplete = personalInfoAvailable && addressAvailable;
  console.log(user);

  const formattedDate = (joinedDate: string) => {
    const date = new Date(joinedDate);
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    
    return formatted;
  }
 

  return (
    <div className="p-6 w-full space-y-8 overflow-y-auto">
      {/* Profile Header */}
      <Card className="border bg-white/95 rounded-xl shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-400">
              <Image
                src="https://i.pravatar.cc/150?img=8"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
              <p className="text-gray-500 text-sm">Joined {formattedDate(user?.createdAt)}</p>
              <Badge className="mt-2 bg-amber-100 text-amber-800 border border-amber-200">
                🌟 Gold Member
              </Badge>
            </div>
          </div>

          <Button onClick={() => setEditing(!editing)}>
            <IconEdit size={18} className="mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Information Sections */}
      <div className="grid md:grid-cols-2 gap-6">
      {/* Personal Info */}
      <Card className="border bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconUser size={20} className="text-amber-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {personalInfoAvailable ? (
            <>
              <div className="flex items-center gap-3 text-gray-700">
                <IconMail size={18} /> {user?.email}
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <IconPhone size={18} /> {user?.phone}
              </div>
            </>
          ) : (
            <EmptyProfileState onClick={() => setOpen(true)} />
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="border bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconMapPin size={20} className="text-green-600" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {addressAvailable ? (
            <p className="text-gray-700">
              {user?.address?.city}, {user?.address?.subcity} <br />
              {user?.address?.country}
            </p>
          ) : (
            !profileComplete && <EmptyProfileState onClick={() => setOpen(true)} />
          )}
        </CardContent>
      </Card>

      {/* Dialog for completing profile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-white rounded-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Complete Your Profile
            </DialogTitle>
          </DialogHeader>
          <ProfileForm email={user?.email} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>

      {/* Preferences */}
      <Card className="border bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconHeartHandshake size={20} className="text-rose-600" />
            Art Preference & Culture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            You love Ethiopian culture & handcrafted items. Let us tailor your experience.
          </p>

          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-rose-100 text-rose-700">Traditional Weaving</Badge>
            <Badge className="bg-amber-100 text-amber-800">Ceramics</Badge>
            <Badge className="bg-indigo-100 text-indigo-700">Wood Crafts</Badge>
          </div>

          {editing && (
            <Button variant="outline" size="sm">
              Update Preferences
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Security & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShield size={20} className="text-blue-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card className="border bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconSettings size={20} className="text-gray-700" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Notification Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
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



function ProfileForm({ email, onClose }: { email: string, onClose: () => void }) {
  const [formData, setFormData] = useState({
    phone: "",
    address: {
      subcity: "",
    city: "",
    country: "",
    },
  });

  const { completeProfile, isLoading, error } = useAuth();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value,  });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, address: {
      ...formData.address, [e.target.name]: e.target.value,
    }})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await completeProfile(formData);

    console.log('profile completed', data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        placeholder="Email"
        value={email}
        required
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handlePhoneChange}
        required
      />
      <Input
        name="subcity"
        placeholder="Subcity"
        value={formData.address.subcity}
        onChange={handleAddressChange}
        required
      />
      <Input
        name="city"
        placeholder="City"
        value={formData.address.city}
        onChange={handleAddressChange}
        required
      />
      <Input
        name="country"
        placeholder="Country"
        value={formData.address.country}
        onChange={handleAddressChange}
        required
      />

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
