import path from 'path';
import multer from 'multer';
import { randomBytes } from 'crypto';

const uploadFolter = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolter,
  storage: multer.diskStorage({
    destination: uploadFolter,
    filename(reqquest, file, callback) {
      const fileHash = randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
