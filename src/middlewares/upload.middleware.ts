// // upload.middleware.ts
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class UploadMiddleware implements NestMiddleware {
//   private upload;

//   constructor(private readonly configService: ConfigService) {
//     cloudinary.config({
//       cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
//       api_key: this.configService.get('CLOUDINARY_API_KEY'),
//       api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
//     });

//     this.upload = multer({ storage: multer.memoryStorage() }).fields([
//       { name: 'cvlink', maxCount: 1 },
//       { name: 'profilepicture', maxCount: 1 },
//       { name: 'aboutpicture', maxCount: 1 },
//     ]);
//   }

//   async use(req: Request, res: Response, next: NextFunction) {
//     this.upload(req, res, async (err) => {
//       if (err) {
//         console.error('File upload failed', err);
//         return res
//           .status(400)
//           .json({ message: 'File upload failed', error: err });
//       }

//       const uploadFile = (file: Express.Multer.File): Promise<string> => {
//         return new Promise((resolve, reject) => {
//           console.log('Uploading files...');
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: 'portfolio' },
//             (error, result) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve(result?.secure_url as string);
//               }
//             },
//           );
//           uploadStream.end(file.buffer);
//         });
//       };

//       try {
//         if (req.files) {
//           const files = req.files as {
//             [fieldname: string]: Express.Multer.File[];
//           };

//           req.body.cvlink = files.cvlink
//             ? await uploadFile(files.cvlink[0])
//             : null;
//           req.body.profilepicture = files.profilepicture
//             ? await uploadFile(files.profilepicture[0])
//             : null;
//           req.body.aboutpicture = files.aboutpicture
//             ? await uploadFile(files.aboutpicture[0])
//             : null;
//         }

//         next();
//       } catch (error) {
//         console.error('Error processing upload', error);
//         return res
//           .status(500)
//           .json({ message: 'Error processing upload', error });
//       }
//     });
//   }
// }
