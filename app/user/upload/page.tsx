"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ImageIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";
import ImageUploader from "@/components/ui/image-dropzone";

export default function UploadPrescription() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Store uploaded file info for DB and preview
  const [uploadedFiles, setUploadedFiles] = useState<
    { path: string; filename: string; previewUrl: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle image selection and upload
  const handleImagesChange = async (files: File[]) => {
    setIsUploading(true);
    const newUploads: { path: string; filename: string; previewUrl: string }[] =
      [];
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Not authenticated", variant: "destructive" });
      setIsUploading(false);
      return;
    }
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const filename = `${uuidv4()}.${ext}`;
      const path = `private/${user.id}/${filename}`;
      // Get signed upload URL
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("prescriptions")
        .createSignedUploadUrl(path);
      if (uploadError || !uploadData) {
        toast({
          title: "Upload error",
          description: uploadError?.message,
          variant: "destructive",
        });
        continue;
      }
      // Upload file
      const uploadRes = await fetch(uploadData.signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!uploadRes.ok) {
        toast({ title: "Upload failed", variant: "destructive" });
        continue;
      }
      // Get signed download URL for preview
      const { data: previewData, error: previewError } = await supabase.storage
        .from("prescriptions")
        .createSignedUrl(path, 60 * 60); // 1 hour
      if (previewError || !previewData) {
        toast({
          title: "Preview error",
          description: previewError?.message,
          variant: "destructive",
        });
        continue;
      }
      newUploads.push({ path, filename, previewUrl: previewData.signedUrl });
    }
    setUploadedFiles(newUploads);
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one prescription image.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      // TODO: Save uploadedFiles.map(f => f.filename) and other form data to prescriptions table here
      toast({
        title: "Prescription uploaded successfully!",
        description:
          "Pharmacies will review your prescription and send quotations soon.",
      });
      setLoading(false);
      router.push("/user/dashboard");
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Upload Prescription
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your prescription images and delivery details
        </p>
      </header>
      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-2">
            <div className="mb-2">
              <h2 className="text-lg font-bold">Prescription Images</h2>
              <p className="text-sm text-gray-500">
                Upload up to 5 clear images of your prescription (JPG, PNG, PDF)
              </p>
            </div>
            <ImageUploader
              maxImages={5}
              onImagesChange={handleImagesChange}
              onUploadStateChange={setIsUploading}
              isUploading={isUploading}
            />
          </div>
          {/* Prescription Details */}
          <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-2">
            <div className="mb-2">
              <h2 className="text-lg font-bold">Prescription Details</h2>
              <p className="text-sm text-gray-500">
                Add any additional notes or special instructions
              </p>
            </div>
            <div>
              <Label htmlFor="note">Notes (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Any special instructions, urgency, or additional information..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-2">
            <div className="mb-2">
              <h2 className="text-lg font-bold">Delivery Information</h2>
              <p className="text-sm text-gray-500">
                Specify where and when you'd like your medications delivered
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete delivery address..."
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time Slot</Label>
                  <Select required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12-14">12:00 PM - 2:00 PM</SelectItem>
                      <SelectItem value="14-16">2:00 PM - 4:00 PM</SelectItem>
                      <SelectItem value="16-18">4:00 PM - 6:00 PM</SelectItem>
                      <SelectItem value="18-20">6:00 PM - 8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number for delivery coordination"
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || isUploading}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {loading ? "Uploading..." : "Upload Prescription"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
