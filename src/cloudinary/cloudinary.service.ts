import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: 'dfjvuauae', // Replace with your Cloudinary cloud name
      api_key: '799729136699115', // Replace with your Cloudinary API key
      api_secret: 'eOz8WZqifiaaSEGGZXpu_UH4giM', // Replace with your Cloudinary API secret
    });
  }

  /**
   * Uploads a file buffer to Cloudinary and returns the URL.
   * @param fileBuffer - The file buffer to upload.
   * @param mimetype - The MIME type of the file (e.g., 'image/jpeg').
   * @returns The Cloudinary upload result containing the URL.
   */
  async uploadMedia(
    fileBuffer: Buffer,
    mimetype: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      // Convert the buffer to a base64-encoded string
      const base64Data = fileBuffer.toString('base64');
      const dataUri = `data:${mimetype};base64,${base64Data}`;

      // Upload the file to Cloudinary
      v2.uploader.upload(
        dataUri,
        { folder: 'photos' }, // Optional: Specify a folder in Cloudinary
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Upload result is undefined'));
          }
        },
      );
    });
  }
}
