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
} from "@tabler/icons-react";
import { useState } from "react";

export default function CustomerProfile() {
  const [editing, setEditing] = useState(false);

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
              <h2 className="text-2xl font-semibold">Mahi Kebede</h2>
              <p className="text-gray-500 text-sm">Joined January 2025</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="border bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUser size={20} className="text-amber-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!editing ? (
              <>
                <div className="flex items-center gap-3 text-gray-700">
                  <IconMail size={18} /> mahi.kebede@example.com
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <IconPhone size={18} /> +251 912 345 678
                </div>
              </>
            ) : (
              <>
                <Input defaultValue="mahi.kebede@example.com" placeholder="Email" />
                <Input defaultValue="+251 912 345 678" placeholder="Phone" />
              </>
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
            {!editing ? (
              <p className="text-gray-700">
                Addis Ababa, Bole <br />
                Ethiopia
              </p>
            ) : (
              <>
                <Input defaultValue="Addis Ababa, Bole" />
                <Input defaultValue="Ethiopia" />
              </>
            )}
          </CardContent>
        </Card>
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
