import { Storage } from "@google-cloud/storage";

// Initialize storage using the same logic as the app
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    // Handle newlines in private key if stored in .env
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME;

async function configureCors() {
  if (!bucketName) {
    console.error("Error: GCP_BUCKET_NAME is not set in environment variables.");
    process.exit(1);
  }

  const bucket = storage.bucket(bucketName);
  
  const corsConfiguration = [
    {
      "origin": ["*"],
      "method": ["GET", "PUT", "POST", "HEAD", "OPTIONS"],
      "responseHeader": ["Content-Type", "x-goog-resumable"],
      "maxAgeSeconds": 3600
    }
  ];

  try {
    console.log(`Setting CORS for bucket: ${bucketName}...`);
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log(`✅ Successfully updated CORS configuration for bucket: ${bucketName}`);
    console.log("You can now upload files.");
  } catch (error) {
    console.error("❌ Error setting CORS:", error);
    if (error.code === 403) {
      console.error("Check if your Service Account has 'Storage Object Admin' or 'Storage Admin' role.");
    }
  }
}

configureCors();
