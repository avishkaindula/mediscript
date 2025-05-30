import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pill, ArrowLeft } from "lucide-react";

export default async function PharmacySignUpPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const messageParam = searchParams["message"];
  const message: Message | undefined = messageParam
    ? { message: messageParam }
    : undefined;
  // Only allow pharmacy sign-up
  const userType = "pharmacy";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center justify-center mb-8 min-h-[40px]">
          <Link href="/" className="absolute left-0 flex items-center">
            <button
              type="button"
              className="bg-transparent border-none p-0 m-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
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
            <CardTitle className="text-center mb-4">
              Sign Up as Pharmacy
            </CardTitle>
            <CardDescription className="text-center">
              Register your pharmacy to join MediScript as a partner and serve
              more patients.
            </CardDescription>
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Want to sign up as a patient?{" "}
                <Link
                  href="/sign-up/user"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Patient Sign Up
                </Link>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <form action={signUpAction} className="space-y-4">
              <input type="hidden" name="userType" value={userType} />
              <div>
                <Label htmlFor="name">Pharmacy Name</Label>
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
              <div>
                <Label htmlFor="address">Pharmacy Address</Label>
                <Textarea id="address" name="address" required />
              </div>
              <div>
                <Label htmlFor="license">License Number</Label>
                <Input id="license" name="license" required />
              </div>
              <div>
                <Label htmlFor="registration">Registration Number</Label>
                <Input id="registration" name="registration" required />
              </div>
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
