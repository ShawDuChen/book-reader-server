import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "@/config";
import jwt from "jsonwebtoken";

const whilteList = [
  "/",
  "/favicon.ico",
  "/auth/login",
  "/auth/register",
  /^\/static\//,
  /^\/api\//,
];

export const getToken = (authorization?: string) => {
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    const token = authorization.split(" ")[1];
    return token;
  }
  return null;
};

export const authenticateToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken: (req) => {
    return getToken(req.headers.authorization)!;
  },
}).unless({
  path: whilteList,
});

export const verify = (token: string | null) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token!, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
