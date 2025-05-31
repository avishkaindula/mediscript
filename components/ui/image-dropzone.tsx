"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  maxImages: number;
  onImagesChange: (images: File[]) => void;
  onUploadStateChange: (isUploading: boolean) => void;
  isUploading?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxImages,
  onImagesChange,
  onUploadStateChange,
  isUploading = false,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(
    new Set()
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxImages - imageFiles.length);
      const startIndex = imagePreviews.length;

      try {
        // Mark new files as uploading
        const newUploadingIndices = new Set(uploadingIndices);
        for (let i = startIndex; i < startIndex + newFiles.length; i++) {
          newUploadingIndices.add(i);
        }
        setUploadingIndices(newUploadingIndices);
        onUploadStateChange(true);

        // Create preview placeholders
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          ...new Array(newFiles.length).fill(null),
        ]);

        // Process each file
        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i];
          const reader = new FileReader();

          await new Promise((resolve) => {
            reader.onload = (e) => {
              setImagePreviews((prevPreviews) => {
                const newPreviews = [...prevPreviews];
                newPreviews[startIndex + i] = e.target!.result as string;
                return newPreviews;
              });
              resolve(null);
            };
            reader.readAsDataURL(file);
          });
        }

        // Update files array
        setImageFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          onImagesChange(updatedFiles);
          return updatedFiles;
        });
      } catch (error) {
        console.error("Error processing files:", error);
      }
    },
    [
      imageFiles,
      maxImages,
      onImagesChange,
      onUploadStateChange,
      uploadingIndices,
    ]
  );

  // Update uploading states when parent upload completes
  useEffect(() => {
    if (!isUploading) {
      setUploadingIndices(new Set());
    }
  }, [isUploading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: maxImages,
  });

  const removeImage = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setImageFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      onImagesChange(updatedFiles);
      return updatedFiles;
    });

    // Update uploading indices after removal
    const newUploadingIndices = new Set(uploadingIndices);
    newUploadingIndices.delete(index);
    setUploadingIndices(newUploadingIndices);
  };

  return (
    <div className="flex p-1 mt-2">
      <div className="flex flex-wrap lg:flex-nowrap gap-2">
        {imagePreviews.map((preview, index) => (
          <div
            key={index}
            className="relative cursor-pointer min-h-[100px] min-w-[100px]"
          >
            {(isUploading && uploadingIndices.has(index)) || !preview ? (
              <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-white border-t-transparent"></div>
              </div>
            ) : (
              <>
                <img
                  src={preview}
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
        {imageFiles.length < maxImages && (
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
