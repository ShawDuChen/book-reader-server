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
  Res,
  UseBefore,
} from "routing-controllers";
import { UserService, User, userValidator, RoleService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser, UpdatePasswordData } from "../typing";
import { createHash } from "../utils/hash";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/user")
@UseBefore(authenticateToken)
export class UserController extends BaseHelper<User> {
  service: UserService;
  roleService: RoleService;
  constructor() {
    super();
    this.service = new UserService();
    this.roleService = new RoleService();
  }

  @Get("/")
  async queryList(
    @QueryParams()
    query: PageQuery<{ username?: string }>,
  ) {
    const { total, lists } = await this.service.queryList(query, {
      relations: ["role"],
    });
    return { total, lists };
  }

  @Get("/all")
  async quertAll() {
    return this.service.getAll();
  }

  @Get("/info")
  async getInfo(@CurrentUser() tokenUser: TokenUser) {
    const user = await this.service.queryOne(
      { username: tokenUser.username },
      {
        relations: ["role"],
      },
    );
    return user;
  }

  @Get("/menus")
  async getMenus(@CurrentUser() tokenUser: TokenUser) {
    const user = await this.getInfo(tokenUser);
    if (!user.role_id) return;
    const menus = await this.roleService.getRoleMenus(user.role_id);
    return menus;
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const user = await this.service.queryOne(
      { id },
      {
        relations: ["role"],
      },
    );
    return user;
  }

  @Get("/:id/:relation")
  async queryDataWithRelation(
    @Param("id") id: number,
    @Param("relation") relation: keyof User,
  ) {
    const pass_relations = [
      "book_comments",
      "book_replies",
      "book_comment_actions",
      "book_reply_actions",
      "chapter_comments",
      "chapter_replies",
      "chapter_comment_actions",
      "chapter_reply_actions",
    ];
    if (!relation || !pass_relations.includes(relation)) {
      return { code: 400, message: "relation not found" };
    }
    const data = await this.service.queryOne(
      {
        id,
      },
      {
        relations: [relation],
      },
    );
    return data[relation] || [];
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
    return newUser;
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

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<User>) {
    return this.export(this.service, res, body);
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
