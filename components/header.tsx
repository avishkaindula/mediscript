"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Pill } from "lucide-react";

export default function Header() {
  return (
    <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group" prefetch={false}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:underline">
                MediScript
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up/user">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started
              </Button>
            </Link>
            <Link href="/sign-up/pharmacy">
              <Button variant="outline">Pharmacy Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 