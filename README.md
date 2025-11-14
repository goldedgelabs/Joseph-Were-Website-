# Modern Profile (Vite React) + Vercel Serverless API (Cloudinary + MongoDB)

This repository is deploy-ready for **Vercel**. It contains:

- `/app` — Vite + React frontend
- `/api` — Vercel Serverless API endpoints (Cloudinary image upload + MongoDB Atlas)

## Quick setup

1. Create a **MongoDB Atlas** cluster and get the `MONGODB_URI`.
2. Create a **Cloudinary** account and note `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
3. In Vercel project settings add environment variables:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

4. Push this repo to GitHub and import to Vercel (or deploy via Vercel CLI).

## Local development

### Frontend
```
cd app
npm install
npm run dev
```

### Local serverless emulation (optional)
Install Vercel CLI and run:
```
npx vercel dev
```

## Notes
- The frontend uploads images by converting them to data-URLs and POSTing to `/api/profile/avatar`.
- Serverless functions upload to Cloudinary and store URLs in MongoDB Atlas.
