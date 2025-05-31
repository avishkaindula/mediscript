"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";

interface UploadedFileInfo {
  path: string;
  filename: string;
  previewUrl: string;
}

interface ImageUploaderProps {
  maxImages: number;
  onImagesChange: (images: UploadedFileInfo[]) => void;
  onUploadStateChange: (isUploading: boolean) => void;
  isUploading?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxImages,
  onImagesChange,
  onUploadStateChange,
  isUploading = false,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(
    new Set()
  );

  const supabase = createClient();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxImages - uploadedFiles.length);
      const startIndex = uploadedFiles.length;
      const newUploadingIndices = new Set(uploadingIndices);
      for (let i = startIndex; i < startIndex + newFiles.length; i++) {
        newUploadingIndices.add(i);
      }
      setUploadingIndices(newUploadingIndices);
      onUploadStateChange(true);

      const newUploaded: UploadedFileInfo[] = [];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        onUploadStateChange(false);
        return;
      }
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const ext = file.name.split(".").pop();
        const filename = `${uuidv4()}.${ext}`;
        const path = `private/${user.id}/${filename}`;
        // Get signed upload URL
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("prescriptions")
          .createSignedUploadUrl(path);
        if (uploadError || !uploadData) {
          continue;
        }
        // Upload file
        const uploadRes = await fetch(uploadData.signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        if (!uploadRes.ok) {
          continue;
        }
        // Get signed download URL for preview
        const { data: previewData, error: previewError } =
          await supabase.storage
            .from("prescriptions")
            .createSignedUrl(path, 60 * 60); // 1 hour
        if (previewError || !previewData) {
          continue;
        }
        newUploaded.push({ path, filename, previewUrl: previewData.signedUrl });
      }
      const allUploaded = [...uploadedFiles, ...newUploaded];
      setUploadedFiles(allUploaded);
      onImagesChange(allUploaded);
      setUploadingIndices(new Set());
      onUploadStateChange(false);
    },
    [
      uploadedFiles,
      maxImages,
      onImagesChange,
      onUploadStateChange,
      uploadingIndices,
      supabase,
    ]
  );

  const removeImage = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onImagesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: maxImages,
  });

  return (
    <div className="flex p-1 mt-2">
      <div className="flex flex-wrap lg:flex-nowrap gap-2">
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="relative cursor-pointer min-h-[100px] min-w-[100px]"
          >
            {isUploading && uploadingIndices.has(index) ? (
              <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-white border-t-transparent"></div>
              </div>
            ) : (
              <>
                <img
                  src={file.previewUrl}
                  alt={`preview image ${index + 1}`}
                  className="min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px] object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full z-20"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L13 1M1 1L13 13"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        ))}
        {uploadedFiles.length < maxImages && (
          <div
            {...getRootProps()}
            className="dropzone flex items-center justify-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <img
                src="/image1.svg"
                alt="plus icon"
                className="mt-[14px] w-10 h-10"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
