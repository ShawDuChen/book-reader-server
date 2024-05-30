import { authenticateToken } from "@/middlewares/jwt";
import {
  BadRequestError,
  ContentType,
  Controller,
  Post,
  UploadedFile,
  UseBefore,
} from "routing-controllers";
import { uploadMiddleware } from "@/multer";

@Controller("/upload")
@ContentType("multipart/form-data")
@UseBefore(authenticateToken)
export class UploadController {
  @Post("/file")
  @UseBefore(uploadMiddleware)
  async uploadFile(@UploadedFile("file") file: Express.Multer.File) {
    console.log("file::::::::::::", file);
    if (!file) {
      return new BadRequestError("File Not Exist");
    }
    return "Uploaded";
  }
}
