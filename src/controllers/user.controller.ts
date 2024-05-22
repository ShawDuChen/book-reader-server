import {
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Delete,
  Get,
  HttpError,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from "routing-controllers";
import { UserService, User, userValidator } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser, UpdatePasswordData } from "../typing";
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
    return { total, lists: lists.map(({ password: _, ...item }) => item) };
  }

  @Get("/info")
  async getInfo(@CurrentUser() tokenUser: TokenUser) {
    const { password: _, ...user } = await this.service.queryOne(
      { username: tokenUser.username },
      {
        relations: ["role"],
      },
    );
    return user;
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const user = await this.service.queryOne(
      { id },
      {
        relations: ["role"],
      },
    );
    const { password: _password, ...ret } = user;
    return ret;
  }

  @Post("/")
  @ContentType("application/json")
  @UseBefore(...userValidator)
  async create(@Body() user: User, @CurrentUser() tokenUser: TokenUser) {
    const password = createHash(user.password);
    const newUser = await this.service.create({
      ...user,
      password,
      created_by: tokenUser.username,
    });
    return { ...newUser, password: undefined };
  }

  @Post("/update_password")
  @ContentType("application/json")
  async updatePassword(
    @Body() data: UpdatePasswordData,
    @CurrentUser() tokenUser: TokenUser,
  ) {
    const user = await this.service.queryOne({ username: tokenUser.username });
    const password = createHash(data.password);
    if (user.password !== password) {
      return new HttpError(500, "密码错误");
    }
    if (data.password === data.confirm_password) {
      return new HttpError(500, "新密码不能与旧密码相同");
    }
    return this.service.update(user.id, {
      ...user,
      password: createHash(data.confirm_password),
    });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() user: User,
    @CurrentUser() tokenUser: TokenUser,
  ) {
    const password = user.password ? createHash(user.password) : undefined;
    return this.service.update(id, {
      ...user,
      password: password!,
      updated_by: tokenUser.username,
    });
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
