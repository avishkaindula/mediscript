"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pill, ArrowLeft } from "lucide-react";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState(searchParams.get("type") || "user");
  // Optionally, you can get message from searchParams if you want to show FormMessage
  const messageParam = searchParams.get("message");
  const message: Message | undefined = messageParam
    ? { message: messageParam }
    : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center justify-center mb-8 min-h-[40px]">
          <Link href="/" className="absolute left-0 flex items-center">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MediScript
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join MediScript to start managing your prescriptions digitally
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={signUpAction} className="space-y-4">
              <div>
                <Label htmlFor="userType">Account Type</Label>
                <Select
                  value={userType}
                  onValueChange={setUserType}
                  name="userType"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Patient</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
                {/* Hidden input to ensure userType is submitted */}
                <input type="hidden" name="userType" value={userType} />
              </div>

              <div>
                <Label htmlFor="name">
                  {userType === "pharmacy" ? "Pharmacy Name" : "Full Name"}
                </Label>
                <Input id="name" name="name" required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>

              {userType === "user" && (
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
              )}

              <div>
                <Label htmlFor="address">
                  {userType === "pharmacy" ? "Pharmacy Address" : "Address"}
                </Label>
                <Textarea id="address" name="address" required />
              </div>

              {userType === "pharmacy" && (
                <>
                  <div>
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" name="license" required />
                  </div>
                  <div>
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input id="registration" name="registration" required />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>

              <SubmitButton
                pendingText="Creating Account..."
                className="w-full"
              >
                Create Account
              </SubmitButton>
              {message && <FormMessage message={message} />}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
