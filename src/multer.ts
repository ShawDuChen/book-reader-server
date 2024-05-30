import multer, { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { UPLOAD_PATH } from "./config";

const storage = diskStorage({
  destination: (_, req, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage, dest: UPLOAD_PATH });

export const uploadMiddleware = upload.single("file");

export default upload;
