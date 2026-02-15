"use client";

import MediaGallery from "@/components/MediaGallery";
import Link from 'next/link';
import { ArrowLeft, Film } from 'lucide-react';
import { motion } from "framer-motion";

export default function VideosPage() {
  return (
    <main className="min-h-screen relative pb-10">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 p-6 border-b border-black/5 bg-white/30 backdrop-blur-xl flex items-center gap-4 shadow-sm"
      >
        <Link href="/" className="p-2 hover:bg-white/50 rounded-full transition-all hover:scale-105 active:scale-95 group">
          <ArrowLeft className="w-6 h-6 text-zinc-800 group-hover:text-gold transition-colors" />
        </Link>
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gold/10 border border-gold/20">
                <Film className="w-5 h-5 text-gold" />
            </div>
            <h1 className="text-2xl font-serif text-zinc-900 tracking-wide">Video Gallery</h1>
        </div>
      </motion.header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="p-6"
      >
        <MediaGallery type="video" />
      </motion.div>
    </main>
  );
}
