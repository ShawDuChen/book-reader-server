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
import ChapterService from "../services/chapter.service";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { Chapter } from "../entities/chapter.entity";

@Controller("/chapter")
export class ChapterController {
  service: ChapterService;

  constructor() {
    this.service = new ChapterService();
  }

  @Get("/")
  @UseBefore(authenticateToken)
  async queryList(@QueryParams() query: PageQuery<Partial<Chapter>>) {
    const { total, lists } = await this.service.queryList(query);
    return { total, lists: lists.map(({ content, ...rest }) => rest) };
  }

  @Get("/:id")
  @UseBefore(authenticateToken)
  async queryById(@Param("id") id: number) {
    return this.service.queryOne({ id });
  }

  @Post("/")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  async create(@Body() body: Chapter, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  async update(@Param("id") id: number, @Body() body: Chapter, @CurrentUser() user: TokenUser) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  @UseBefore(authenticateToken)
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
