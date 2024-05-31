import multer, { Options, diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { UPLOAD_PATH } from "./config";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage, dest: UPLOAD_PATH });

export const uploadMiddleware = upload.single("file");

export const fileUploadOptions: () => Options = () => ({
  storage,
  limits: {
    fieldNameSize: 255,
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
