# #Saga – Wedding Archive 🎞️✨

A modern wedding media archive platform built with Next.js that allows guests to upload and share photos and videos from special events. Designed to be elegant, responsive, and scalable for multiple weddings.

<br>

## 📂 Project Structure

    saga-wedding-archive/
    │
    ├── app/
    │   ├── layout.js              # Root layout configuration
    │   ├── page.js                # Main landing page
    │   ├── globals.css            # Global styles
    │   ├── api/
    │   │   ├── upload/            # Presigned upload API route
    │   │   └── gallery/           # Media fetch API route
    │
    ├── components/
    │   ├── UploadDropzone.jsx     # File upload component
    │   ├── MediaGallery.jsx       # Photo & video gallery component
    │
    ├── public/                    # Static assets
    ├── .gitignore                 # Ignored files
    ├── package.json               # Project dependencies
    ├── README.md                  # Project documentation

<br>

## 🛠 Prerequisites

Node.js 18+  
Download from: https://nodejs.org

Git  
Download from: https://git-scm.com

Cloud Storage Account  
(Example: AWS S3 / Google Cloud Storage)

<br>

## ⚡️ Quickstart


```bash
git clone https://github.com/YOUR_USERNAME/saga-wedding-archive.git
cd saga-wedding-archive
npm install
npm run dev
