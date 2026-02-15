import { storage, bucketName } from "@/lib/gcs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { filename, filetype } = await request.json();
    
    // Create a unique filename
    const uniqueFilename = `uploads/${Date.now()}-${filename}`;
    const file = storage.bucket(bucketName).file(uniqueFilename);

    // Generate a signed URL for uploading
    // content-type is strictly enforced
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: filetype,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("GCS Presigning error:", error);
    return NextResponse.json({ error: "Error creating upload link" }, { status: 500 });
  }
}

