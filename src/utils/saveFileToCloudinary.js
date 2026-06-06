import { v2 as cloudinary } from 'cloudinary';

export const saveFileToCloudinary = async (buffer, userId) => {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const options = {
    folder: 'students-app/avatars',
    resource_type: 'image',
    public_id: userId.toString(),
    unique_filename: false,
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};
