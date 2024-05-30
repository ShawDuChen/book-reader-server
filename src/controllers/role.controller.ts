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
  Res,
  UseBefore,
} from "routing-controllers";
import { MenuService, Role, RoleService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
import { In } from "typeorm";
@Controller("/role")
@UseBefore(authenticateToken)
export class RoleController extends BaseHelper<Role> {
  service: RoleService;
  menuService: MenuService;

  constructor() {
    super();
    this.service = new RoleService();
    this.menuService = new MenuService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Role>>) {
    return this.service.queryList(query);
  }

  @Get("/all")
  async quertAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    return this.service.queryOne({ id });
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Role, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Role>) {
    return this.export(this.service, res, body);
  }

  @Post("/:id/bind_menus")
  @ContentType("application/json")
  async bindMenus(
    @Param("id") id: number,
    @Body() body: { ids: number[] },
    @CurrentUser() user: TokenUser,
  ) {
    const role = await this.service.queryOne(
      { id },
      {
        relations: ["menus"],
      },
    );
    const menus = await this.menuService.find({
      where: {
        id: In(body.ids),
      },
    });
    role.menus = [...menus];
    role.updated_by = user.username;
    await this.service.save(role);
    return role;
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Role,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
