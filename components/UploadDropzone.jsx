"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, CheckCircle, XCircle, Loader2, FileImage, FileVideo } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadDropzone() {
  const [uploads, setUploads] = useState([]); // { file, status: 'pending'|'uploading'|'success'|'error', preview: string }

  const uploadFile = async (item) => {
    try {
      // 1. Get Presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ filename: item.file.name, filetype: item.file.type }),
        headers: { "Content-Type": "application/json" },
      });
      const { url } = await res.json();

      if (!url) throw new Error("Failed to get upload URL");

      // 2. Upload to GCS
      const uploadRes = await fetch(url, {
        method: "PUT",
        body: item.file,
        headers: { "Content-Type": item.file.type },
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed with status: ${uploadRes.status}`);
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newUploads = acceptedFiles.map((file) => ({
      file,
      status: "uploading",
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file), // Create local preview
    }));

    setUploads((prev) => [...newUploads, ...prev]);

    // Process uploads sequentially or logically
    for (const item of newUploads) {
      const success = await uploadFile(item);
      
      setUploads((prev) =>
        prev.map((u) =>
          u.id === item.id ? { ...u, status: success ? "success" : "error" } : u
        )
      );

      // If successful, animate "archive" removal after delay
      if (success) {
        setTimeout(() => {
          setUploads((prev) => prev.filter((u) => u.id !== item.id));
        }, 2000); // 2 seconds to admire success state
      }
    }
  }, []);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      uploads.forEach((u) => u.preview && URL.revokeObjectURL(u.preview));
    };
  }, [uploads]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-4 relative">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 backdrop-blur-sm
          ${
            isDragActive
              ? "border-gold bg-gold/10 scale-105"
              : "border-zinc-500 hover:border-gold hover:bg-white/10 bg-black/5"
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-black drop-shadow-sm" />
        <p className="text-lg font-medium text-white">Capture the moment</p>
        <p className="text-sm text-white mt-2 font-medium">
          Tap to select or drop photos & videos here
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-4">
        <AnimatePresence mode="popLayout">
          {uploads.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                y: 100, /* Fly down */
                scale: 0.5, 
                filter: "blur(10px)",
                transition: { duration: 0.5, ease: "backIn" }
              }}
              className={`
                relative w-full overflow-hidden rounded-lg border flex items-center p-3 gap-4 shadow-lg
                ${item.status === 'error' ? 'border-red-500/50 bg-red-900/10' : 'border-white/10 bg-black/40 backdrop-blur-md'}
              `}
            >
              {/* Thumbnail Container */}
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-black/50 flex-shrink-0 border border-white/10">
                {item.file.type.startsWith("image") ? (
                    <img 
                        src={item.preview} 
                        alt="preview" 
                        className={`w-full h-full object-cover transition-opacity duration-500 ${item.status === 'success' ? 'opacity-100' : 'opacity-70 grayscale'}`} 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FileVideo className="w-6 h-6" />
                    </div>
                )}
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {item.status === 'uploading' && <Loader2 className="w-6 h-6 animate-spin text-white drop-shadow-md" />}
                </div>
              </div>

              {/* Status Text & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm truncate text-gray-200">{item.file.name}</p>
                </div>
                
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    {item.status === 'uploading' && (
                        <motion.div 
                            className="h-full bg-gold"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                    {item.status === 'success' && (
                        <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                        />
                    )}
                    {item.status === 'error' && (
                        <div className="h-full bg-red-500 w-full" />
                    )}
                </div>
                
                <p className="text-xs text-gray-400 mt-1">
                    {item.status === 'uploading' && "Developing..."}
                    {item.status === 'success' && <span className="text-gold flex items-center gap-1">Archived to Gallery <CheckCircle className="w-3 h-3"/></span>}
                    {item.status === 'error' && <span className="text-red-400">Upload Failed</span>}
                </p>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
