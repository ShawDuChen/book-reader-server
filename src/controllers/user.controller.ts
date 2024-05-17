import {
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Delete,
  Get,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from "routing-controllers";
import { UserService } from "../services/user.service";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { User } from "../entities/user.entity";
import { createHash } from "../utils/hash";

@Controller("/user")
export class UserController {
  service: UserService;

  constructor() {
    this.service = new UserService();
  }

  @Get("/") // queryList
  @UseBefore(authenticateToken)
  queryList(
    @QueryParams()
    query: PageQuery<{ username?: string }>,
  ) {
    return this.service.queryList(query);
  }

  @Get("/:id")
  @UseBefore(authenticateToken)
  queryById(@Param("id") id: number) {
    return this.service.queryOne({ id });
  }

  @Post("/")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  create(@Body() user: User, @CurrentUser() tokenUser: TokenUser) {
    const password = createHash(user.password);
    return this.service.create({ ...user, password, created_by: tokenUser.username });
  }

  @Put("/:id")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  async update(@Param("id") id: number, @Body() user: User, @CurrentUser() tokenUser: TokenUser) {
    return this.service.update(id, { ...user, updated_by: tokenUser.username });
  }

  @Delete("/:id")
  @UseBefore(authenticateToken)
  delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
