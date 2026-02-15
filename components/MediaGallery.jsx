"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function MediaGallery({ type }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gallery?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.files) setMedia(data.files);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {media.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No {type}s uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden rounded-lg bg-gray-900"
            >
              {type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={item.url} 
                  alt="Wedding upload" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                />
              ) : (
                <video 
                  src={item.url} 
                  className="w-full h-full object-cover" 
                  controls 
                />
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 cursor-pointer">
                  <a href={item.downloadUrl} className="text-xs text-white underline">Download</a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
