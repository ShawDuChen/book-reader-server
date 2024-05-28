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
import { Menu, MenuService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { listToTree } from "../utils/tree";

@Controller("/menu")
@UseBefore(authenticateToken)
export class MenuController {
  service: MenuService;

  constructor() {
    this.service = new MenuService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Menu>>) {
    return this.service.queryList(query);
  }

  @Get("/all")
  async quertAll() {
    return this.service.getAll();
  }

  @Get("/tree")
  async menuTree() {
    const list = await this.quertAll();
    const tree = listToTree(list);
    return { total: list.length, lists: tree };
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const menu = await this.service.queryOne({ id });
    let parent_id = menu.parent_id;
    const parent_ids: number[] = [];
    while (parent_id) {
      parent_ids.unshift(menu.parent_id);
      parent_id = (await this.service.queryOne({ id: parent_id })).parent_id;
    }
    return { ...menu, parent_ids: parent_ids.length ? parent_ids : [0] };
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Menu, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Menu,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
