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

export default function UploadPrescription() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive",
      });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one prescription image.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Prescription uploaded successfully!",
      description:
        "Pharmacies will review your prescription and send quotations soon.",
    });

    setLoading(false);
    router.push("/user/dashboard");
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
      {/* Main profile content */}
      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload (Modal Trigger) */}
          <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-2">
            <div className="mb-2">
              <h2 className="text-lg font-bold">Prescription Images</h2>
              <p className="text-sm text-gray-500">
                Upload up to 5 clear images of your prescription (JPG, PNG, PDF)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" onClick={() => setModalOpen(true)}>
                Upload Images
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {images.length === 0
                  ? "No images selected"
                  : `${images.length} image${
                      images.length > 1 ? "s" : ""
                    } selected`}
              </span>
            </div>
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
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {loading ? "Uploading..." : "Upload Prescription"}
            </Button>
          </div>
        </form>
      </div>

      {/* Custom Modal for Image Upload */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-2">Upload Images</h2>
            <p className="text-sm text-gray-500 mb-4">
              You can upload up to 5 images (JPG, PNG, PDF).
            </p>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="modal-file-upload"
                  ref={fileInputRef}
                />
                <label htmlFor="modal-file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Click to upload files
                  </p>
                  <p className="text-sm text-gray-500">
                    or drag and drop your prescription images here
                  </p>
                </label>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-32 overflow-y-auto mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group w-20 h-20">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate w-full">
                        {image.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
