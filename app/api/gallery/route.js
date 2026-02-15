import { storage, bucketName } from "@/lib/gcs";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'image'; // 'image' or 'video'

  try {
    const bucket = storage.bucket(bucketName);
    
    // List files with prefix 'uploads/'
    const [files] = await bucket.getFiles({ prefix: 'uploads/' });

    if (!files || files.length === 0) return NextResponse.json({ files: [] });

    // Filter by extension
    const filtered = files.filter(file => {
      const name = file.name.toLowerCase();
      // Skip the folder placeholder itself if it exists
      if (name === 'uploads/') return false;

      const isImage = name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.gif') || name.endsWith('.webp') || name.endsWith('.heic');
      const isVideo = name.endsWith('.mp4') || name.endsWith('.mov') || name.endsWith('.webm') || name.endsWith('.avi');
      
      return type === 'image' ? isImage : isVideo;
    });

    // Generate Signed URLs for viewing
    const filesWithUrls = await Promise.all(filtered.map(async (file) => {
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
      });

      return {
        key: file.name,
        url,
        // metadata might require a separate fetch (getMetadata()), 
        // but the File object has minimal info.
        // For simple list, we usually don't have LastModified directly in the simple File object 
        // without an extra call or using the response header approach.
        // However, `file.metadata` is populated after `getFiles`? 
        // Yes, `getFiles` populates metadata.
        lastModified: file.metadata.updated || new Date().toISOString(), 
      };
    }));

    return NextResponse.json({ files: filesWithUrls });
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

