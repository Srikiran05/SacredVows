# Wedding Upload Website Setup Instructions (Google Cloud Logic)

## 1. Google Cloud Storage Setup
You need a Google Cloud Platform (GCP) account.

1.  **Create a Project**: Go to console.cloud.google.com and create a new project.
2.  **Enable API**: Enable "Google Cloud Storage JSON API" for your project.
3.  **Create a Bucket**: 
    *   Create a bucket (e.g., `babys-wedding-archive`)
    *   Set it to "Standard" storage class.
    *   Keep it **Private** (Uniform Access Control is fine).

4.  **CORS Configuration** (Crucial for Uploads):
    *   You must configure CORS on the bucket to allow uploads from the browser.
    *   Create a file `cors.json`:
        ```json
        [
          {
            "origin": ["*"],
            "method": ["GET", "PUT", "POST", "HEAD", "OPTIONS"],
            "responseHeader": ["Content-Type", "x-goog-resumable"],
            "maxAgeSeconds": 3600
          }
        ]
        ```
    *   Run this command in Cloud Shell or your local terminal (if gcloud is installed):
        `gcloud storage buckets update gs://YOUR_BUCKET_NAME --cors-file=cors.json`

5.  **Service Account (Credentials)**:
    *   Go to **IAM & Admin** > **Service Accounts**.
    *   Create a generic Service Account.
    *   Grant it the role **Storage Object Admin** (so it can read/write objects).
    *   Go to the "Keys" tab of the service account and **Create new key** (JSON).
    *   Open the JSON file downloaded.

## 2. Environment Variables
1.  Rename `.env.local.example` to `.env.local`.
2.  Fill in your details from the JSON file:
    ```
    GCP_PROJECT_ID=project_id_from_json
    GCP_CLIENT_EMAIL=client_email_from_json
    GCP_PRIVATE_KEY="private_key_from_json" 
    GCP_BUCKET_NAME=your-bucket-name
    ```
    *Note: When pasting the private key, keep the "\n" characters or ensures it handles newlines correctly.*

## 3. Running the App
1.  Open terminal.
2.  Run `npm run dev`.
3.  Open `http://localhost:3000`.

## 4. Deployment
For the wedding:
1.  Deploy to **Vercel** (Free & Easy).
2.  Connect your GitHub repo.
3.  Add the Environment Variables in Vercel Project Settings.
    *   *Tip for Vercel*: For `GCP_PRIVATE_KEY`, copy the entire string including `-----BEGIN...` and `...END-----`. If you have issues, try replacing actual newlines with `\n` literal.
4.  Get the URL.
5.  Generate a QR Code pointing to that URL.

