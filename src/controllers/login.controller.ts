import {
  Body,
  ContentType,
  Controller,
  Post,
  UnauthorizedError,
  UseBefore,
} from "routing-controllers";
import { JWT_SECRET, ONE_DAY_TIMESTAMP } from "../config";
import jwt from "jsonwebtoken";
import { UserService, User, userValidator } from "../export";
import { createHash } from "../utils/hash";
import { CredentialsParams } from "../typing";

@Controller("/auth")
export class LoginController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  @Post("/login")
  @ContentType("application/json")
  @UseBefore(...userValidator)
  async login(@Body() credentials: CredentialsParams) {
    const valid = await this.validateUser(credentials);
    if (valid) {
      const token = jwt.sign(
        {
          username: valid.username,
          nickname: valid.nickname,
          role: valid.role?.name,
          is_super: valid.is_super,
          expiresIn: Date.now() + ONE_DAY_TIMESTAMP,
        },
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
    return this.service.login({ ...credentials, password });
  }

  @Post("/register")
  @ContentType("application/json")
  @UseBefore(...userValidator) //json(),
  async register(@Body() user: User) {
    const password = createHash(user.password);
    const nickname = this.getNickname(user.username);
    return this.service.register({ ...user, password, nickname });
  }

  getNickname(username: string): string {
    const index = username.indexOf("@");
    return username.substring(0, index);
  }
}
