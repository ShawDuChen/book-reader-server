import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "../config";

const whilteList = ["/", "/auth/login", "/auth/register"];

export const authenticateToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      const token = req.headers.authorization.split(" ")[1];
      return token;
    }
    return undefined;
  },
}).unless({
  path: whilteList,
});
