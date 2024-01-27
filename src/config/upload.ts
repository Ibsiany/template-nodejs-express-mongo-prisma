import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const uploadFolder = resolve(__dirname, '..', '..', 'upload');

export default {
  uploadFolder,

  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
