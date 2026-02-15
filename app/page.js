"use client";

import UploadDropzone from "@/components/UploadDropzone";
import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Video } from "lucide-react";

export default function Home() {
  return (
    <main className="h-[100dvh] flex flex-col items-center p-4 md:p-6 overflow-hidden">

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full text-center space-y-2 pt-8 md:pt-12"
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white tracking-wide">
          #Saga
        </h1>

        {/* Slight right shift only on desktop */}
        <p className="text-white text-s sm:text-sm uppercase tracking-[0.2em] font-semibold md:translate-x-8">
          Feb 21st • The Archive
        </p>
        <p className="text-white text-s tracking-widest font-semibold mt-1">
    By Srikiran
  </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mt-6 md:mt-10"
      >
        <UploadDropzone />
      </motion.div>

      {/* Gallery Links */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-16"
      >
        <Link href="/gallery/images">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group relative h-32 sm:h-36 md:h-40 rounded-2xl border border-black/5 bg-white/30 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg hover:shadow-gold/20 hover:border-gold/30 transition-colors"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-black" />
              <span className="font-semibold text-white text-sm md:text-lg">
                Photo Gallery
              </span>
            </div>
          </motion.div>
        </Link>
        
        <Link href="/gallery/videos">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group relative h-32 sm:h-36 md:h-40 rounded-2xl border border-black/5 bg-white/30 backdrop-blur-md overflow-hidden cursor-pointer shadow-lg hover:shadow-gold/20 hover:border-gold/30 transition-colors"
          >
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Video className="w-6 h-6 md:w-8 md:h-8 text-black" />
              <span className="font-semibold text-white text-sm md:text-lg">
                Video Gallery
              </span>
            </div>
          </motion.div>
        </Link>
      </motion.div>

    </main>
  );
}
