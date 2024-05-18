import { Request, Response, NextFunction } from "express";
import db from "../data-source";
import { Logger } from "../export";
import dayjs from "dayjs";
import logger from "../logger";
import { TokenUser } from "../typing";

interface LoggerRequest extends Request {
  user?: TokenUser;
}

export const logMiddleware = async (
  req: LoggerRequest,
  res: Response,
  next: NextFunction,
) => {
  const start = new Date();
  const logRepository = db.getRepository(Logger);

  res.on("close", async () => {
    const end = new Date();
    const duration = end.getTime() - start.getTime();

    const logData = new Logger();
    logData.method = req.method;
    logData.url = req.originalUrl;
    logData.status = res.statusCode;
    logData.request_body = JSON.stringify(req.body);
    logData.response_body = res.statusMessage;
    logData.created_at = dayjs(start).format("YYYY-MM-DD HH:mm:ss");
    logData.created_by = req.user?.username || "unknown";
    try {
      await logRepository.save(logData);
      logger.info(
        `Logged request: ${req.originalUrl} - Status: ${res.statusCode} - Duration ${duration}`,
      );
    } catch (error: any) {
      logger.error(`Error saving request log to DB: ${error.message}`);
    }
  });
  next();
};
