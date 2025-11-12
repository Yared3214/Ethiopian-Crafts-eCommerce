"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconLoader2, IconPhotoPlus, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import useArtisan from "@/hooks/useArtisan";
import { showToast } from "nextjs-toast-notify";

export default function AddArtisanForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    profilePic: "",
  });

  const [profilePic, setProfilePic] = useState<File>( {} as File);
  const [preview, setPreview] = useState<string | null>(null);
  const { createArtisanHandler, loading, error } = useArtisan();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting artisan:", formData);
    // Add your submit logic here (e.g., Firestore, API);
    try {
        const result = await createArtisanHandler({...formData, profilePic});
        
                    if (result) {
                        showToast.success("Artisan Created Successfully", {
                            duration: 4000,
                            progress: false,
                            position: "bottom-right",
                            transition: "slideInUp",
                            icon: "",
                            sound: false,
                        });
                    }
    } catch (err: any) {
        console.error("❌ Error adding blog:", err);
     }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center w-full"
    >
      <Card className="w-full md:my-10 md:mx-0 mx-5 max-w-lg shadow-lg border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
            Add New Artisan
          </CardTitle>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showcase the artisan’s story and craft.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                ) : (
                  <IconUser className="w-10 h-10 text-neutral-400" />
                )}
              </div>
              <label
                htmlFor="profilePic"
                className="cursor-pointer flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <IconPhotoPlus className="w-4 h-4" />
                Upload Photo
              </label>
              <input
                id="profilePic"
                name="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="e.g. Sara Weaves"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="description"
                placeholder="Tell us about the artisan’s craft, story, and inspiration..."
                value={formData.description}
                onChange={handleChange}
                className="min-h-[100px]"
                required
              />
            </div>
            {error && (
                <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
              )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? (
                                <>
                                  <IconLoader2 className="animate-spin" size={18} />
                                  <span>Saving...</span>
                                </>
                              ) : (
                                <>
                                  <span>Save Artisan</span>
                                </>
                              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
