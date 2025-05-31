"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { PhoneInput } from "@/components/ui/phone-input";
import type { Tables } from "@/utils/supabase/types";
import { parsePhoneNumber } from "react-phone-number-input";

export default function UserProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const userId = userData.user.id;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error || !data) {
        setProfile(null);
        setLoading(false);
        return;
      }
      setProfile(data);
      setAvatarUrl(data.avatar_url || "");
      setName(data.name || "");
      // Normalize phone to E.164 (no spaces)
      let phoneValue = data.phone || "";
      if (phoneValue && phoneValue.startsWith("+")) {
        const parsed = parsePhoneNumber(phoneValue);
        phoneValue = parsed ? parsed.number : phoneValue.replace(/\s+/g, "");
      }
      setPhone(phoneValue);
      setDob(data.dob || "");
      setAddress(data.address || "");
      setLoading(false);
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !profile) return;
    const file = e.target.files[0];
    setAvatarUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${profile.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast({
        title: "Avatar upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      setAvatarUploading(false);
      return;
    }
    // Get public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    if (!data?.publicUrl) {
      toast({ title: "Failed to get avatar URL", variant: "destructive" });
      setAvatarUploading(false);
      return;
    }
    setAvatarUrl(data.publicUrl);
    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", profile.id);
    if (updateError) {
      toast({
        title: "Failed to update profile",
        description: updateError.message,
        variant: "destructive",
      });
      setAvatarUploading(false);
      return;
    }
    setProfile({ ...profile, avatar_url: data.publicUrl });
    toast({ title: "Avatar updated!" });
    setAvatarUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    // Always save phone in E.164 format (no spaces)
    let phoneToSave = phone;
    if (phoneToSave && phoneToSave.startsWith("+")) {
      const parsed = parsePhoneNumber(phoneToSave);
      phoneToSave = parsed ? parsed.number : phoneToSave.replace(/\s+/g, "");
    }
    const { error } = await supabase
      .from("profiles")
      .update({ name, phone: phoneToSave, dob, address })
      .eq("id", profile.id);
    setLoading(false);
    if (error) {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Profile updated successfully!",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal information
        </p>
      </header>
      {/* Main profile content */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                {avatarUploading ? (
                  <div className="w-24 h-24 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
                  </div>
                ) : (
                  <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} />
                )}
                <AvatarFallback className="text-2xl">
                  {name ? name[0] : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <label htmlFor="avatar-upload">
                  <Button asChild variant="outline" disabled={avatarUploading}>
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      {avatarUploading ? "Uploading..." : "Change Picture"}
                    </span>
                  </Button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={avatarUploading}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="LK"
                  international
                  required
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
