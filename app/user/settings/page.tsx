"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { UserSidebar } from "@/components/user-sidebar";
import { Shield, Bell, Mail, Smartphone } from "lucide-react";

export default function UserSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Password changed successfully!",
      description: "Your password has been updated.",
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="rounded-2xl shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-2">
                <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </span>
              <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">Change Password</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Update your password to keep your account secure
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-5 mt-2">
              <div className="space-y-1">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" required className="mt-1" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" required className="mt-1" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" required className="mt-1" />
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-2">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
          &copy; {new Date().getFullYear()} Mediscript
        </div>
      </div>
    </div>
  );
}
