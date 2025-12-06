# ☁️ Cloudinary Image Upload

This project uses a server-side streaming approach to upload images to Cloudinary. This ensures compatibility with Next.js 16 Server Actions and serverless environments (like Vercel) where file system access is limited.

## 1. Environment Setup

To enable image uploads, you must configure the following keys in your `.env.local` file.

> ⚠️ **Security Note**: Do NOT prefix these with `NEXT_PUBLIC_`. The API Secret must remain on the server side.

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 2. Architecture

- **Lib Helper** (`lib/cloudinary.js`): Contains the `uploadToCloudinary` function. It converts the Web File object into a Node.js Buffer and pipes it directly to Cloudinary using `upload_stream`.
- **Server Action**: A server-side function acts as the bridge between the React Client Component and the Cloudinary SDK.

## 3. Usage Guide

To upload an image, use the global helper within a Server Action.

### Step 1: Create a Server Action

Inside `app/actions/upload.js` (or your specific feature action file):

```javascript
'use server'

import { uploadToCloudinary } from '@/lib/cloudinary';

export async function uploadImage(formData) {
  const file = formData.get('image');
  
  // Upload to the 'uploads' folder in Cloudinary
  const result = await uploadToCloudinary(file, 'uploads');
  
  return { url: result.secure_url };
}
```

### Step 2: Call from Client Component

Inside your React component:

```javascript
'use client'
import { uploadImage } from '@/app/actions/upload';

export default function ImageUploader() {
  async function handleSubmit(formData) {
    const result = await uploadImage(formData);
    console.log("Uploaded Image URL:", result.url);
  }

  return (
    <form action={handleSubmit}>
      <input type="file" name="image" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}
```

## 4. API Reference

### `uploadToCloudinary(file, folder)`

**Parameters:**
- `file` (File): The file object from the FormData.
- `folder` (String): *(Optional)* The folder name in Cloudinary. Defaults to `nextjs_uploads`.

**Returns:** A Promise that resolves to the Cloudinary Upload API response object.

---

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)