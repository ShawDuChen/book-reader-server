import { Body, ContentType, Controller, Post, UnauthorizedError } from "routing-controllers";
import { JWT_SECRET, ONE_DAY_TIMESTAMP } from "../config";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

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
    return this.userService.login(credentials);
  }

  @Post("/register")
  @ContentType("application/json")
  async register(@Body() user: User) {
    return this.userService.register(user);
  }
}
