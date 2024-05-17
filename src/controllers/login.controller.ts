import { Body, ContentType, Controller, Post, UnauthorizedError } from "routing-controllers";
import { JWT_SECRET, ONE_DAY_TIMESTAMP } from "../config";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { createHash } from "../utils/hash";

interface CredentialsParams {
  username: string;
  password: string;
}

@Controller("/auth")
export class LoginController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post("/login")
  @ContentType("application/json")
  async login(@Body() credentials: CredentialsParams) {
    const valid = await this.validateUser(credentials);
    if (valid) {
      const token = jwt.sign(
        { username: credentials.username, roles: ["ADMIN"], expiresIn: Date.now() + ONE_DAY_TIMESTAMP },
        JWT_SECRET,
        { expiresIn: "24h" },
      );
      return { token };
    } else {
      throw new UnauthorizedError("Invalid creentials");
    }
  }
  async validateUser(credentials: CredentialsParams) {
    const password = createHash(credentials.password);
    return this.userService.login({ ...credentials, password });
  }

  @Post("/register")
  @ContentType("application/json")
  async register(@Body() user: User) {
    const password = createHash(user.password);
    return this.userService.register({ ...user, password });
  }
}
