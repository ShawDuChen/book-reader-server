import { resolve } from "node:path";

export const JWT_SECRET = "9876543210_this_is_a_jwt_secret_0123456789";
export const ONE_DAY_TIMESTAMP = 24 * 60 * 60 * 1000;

export const UPLOAD_PATH = resolve(__dirname, "../uploads");
