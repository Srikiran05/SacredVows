import { Storage } from "@google-cloud/storage";

// Initialize storage with environment variables
// Ensure you have a Service Account with "Storage Object Admin" or similar permissions
export const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    // Handle newlines in private key if stored in .env
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export const bucketName = process.env.GCP_BUCKET_NAME;
