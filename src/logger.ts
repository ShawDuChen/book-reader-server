import * as winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  format: winston.format.json(),
});

export default logger;
