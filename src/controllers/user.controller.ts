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
import { UserService, User } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { createHash } from "../utils/hash";

@Controller("/user")
@UseBefore(authenticateToken)
export class UserController {
  service: UserService;

  constructor() {
    this.service = new UserService();
  }

  @Get("/")
  async queryList(
    @QueryParams()
    query: PageQuery<{ username?: string }>,
  ) {
    const { total, lists } = await this.service.queryList(query);
    return { total, lists: lists.map(({ password, ...item }) => item) };
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const user = await this.service.queryOne({ id });
    const { password, ...ret } = user;
    return ret;
  }

  @Post("/")
  @ContentType("application/json")
  create(@Body() user: User, @CurrentUser() tokenUser: TokenUser) {
    const password = createHash(user.password);
    return this.service.create({ ...user, password, created_by: tokenUser.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(@Param("id") id: number, @Body() user: User, @CurrentUser() tokenUser: TokenUser) {
    return this.service.update(id, { ...user, updated_by: tokenUser.username });
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
