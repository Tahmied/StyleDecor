'use server'
import { uploadToCloudinary } from "@/lib/Cloudinary";

export async function uploadImageAction(formData) {
  const file = formData.get('image'); 

  if (!file) {
    throw new Error('No file provided');
  }

  try {
    const result = await uploadToCloudinary(file, "my-blog-images");
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Upload failed' };
  }
}