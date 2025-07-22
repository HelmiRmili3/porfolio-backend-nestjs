import { Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FastifyRequest } from 'fastify';

@Controller('images')
export class ImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  async uploadFiles(@Req() req: FastifyRequest) {
    try {
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      console.log('Files:', req.isMultipart());

      // Check if the request is multipart
      if (!req.isMultipart()) {
        throw new BadRequestException('Request is not multipart');
      }

      // Object to store the results of uploaded files
      const results: { [fieldname: string]: string } = {};

      // Iterate over all files in the request
      for await (const file of req.files()) {
        console.log('Uploaded file:', file.filename);
        console.log('Fieldname:', file.fieldname);
        console.log('Mimetype:', file.mimetype);

        // Ensure the mimetype is valid
        if (!file.mimetype || file.mimetype === 'multipart/form-data') {
          throw new BadRequestException('Invalid file mimetype');
        }

        // Convert the file stream to a buffer
        const buffer = await file.toBuffer();

        // Pass the buffer to the Cloudinary service
        const result = await this.cloudinaryService.uploadMedia(
          buffer,
          file.mimetype,
        );

        // Store the URL of the uploaded file using the fieldname as the key
        results[file.fieldname] = result.secure_url;
      }

      // Return the results of all uploaded files
      return results;
    } catch (error) {
      console.log('Error uploading the files:', error);
      throw new Error('Failed to upload files');
    }
  }
}
