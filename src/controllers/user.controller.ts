import { Controller, Get, UseBefore } from "routing-controllers";
import { UserService } from "../services/user.service";
import { authenticateToken } from "../middlewares/jwt";

@Controller("/user")
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get("/queryList")
  @UseBefore(authenticateToken)
  queryList() {
    return this.userService.queryList();
  }
}
