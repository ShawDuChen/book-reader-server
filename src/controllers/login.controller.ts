import {
  Body,
  ContentType,
  Controller,
  Post,
  BadRequestError,
  UseBefore,
} from "routing-controllers";
import { JWT_SECRET, ONE_DAY_TIMESTAMP } from "../config";
import jwt from "jsonwebtoken";
import { UserService, User, userValidator } from "@/export";
import { createHash } from "../utils/hash";
import { CredentialsParams } from "@/typing";

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
          user_id: valid.id,
          username: valid.username,
          nickname: valid.nickname,
          role: valid.role?.name,
          is_super: valid.is_super,
          expiresIn: 7 * ONE_DAY_TIMESTAMP + Date.now(),
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      );
      return { token };
    } else {
      throw new BadRequestError("Invalid creentials");
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
    const nickname = user.nickname || this.getNickname(user.username);
    return this.service.register({ ...user, password, nickname });
  }

  getNickname(username: string): string {
    const index = username.indexOf("@");
    return username.substring(0, index);
  }

  @Post("/reset_password")
  @ContentType("application/json")
  async resetPassword(
    @Body() body: Pick<User, "username" | "password" | "tel">,
  ) {
    const { username, password, tel } = body;
    const user = await this.service.queryOne({ username, tel });
    if (!user) {
      throw new BadRequestError("用户不存在");
    }
    const newPassword = createHash(password);
    await this.service.update(user.id, { ...user, password: newPassword });
    return user;
  }
}
