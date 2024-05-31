import { authenticateToken } from "@/middlewares/jwt";
import { fileUploadOptions } from "@/multer";
import {
  BadRequestError,
  Body,
  JsonController,
  Post,
  QueryParams,
  UploadedFile,
  UseBefore,
} from "routing-controllers";

@JsonController("/upload")
@UseBefore(authenticateToken)
export class UploadController {
  @Post("/file")
  async uploadFile(
    @Body() body: any,
    @QueryParams() params: any,
    @UploadedFile("file", {
      options: fileUploadOptions(),
    })
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestError("File Not Exist");
    }
    console.log("uploadFile body::::::", body);
    console.log("uploadFile params::::::", params);

    return {
      message: "success",
      filename: `${process.env.STATIC_URL}${file.filename}`,
    };
  }
}
