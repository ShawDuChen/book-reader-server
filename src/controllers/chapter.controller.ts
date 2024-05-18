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
import { ChapterService, Chapter } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";

@Controller("/chapter")
@UseBefore(authenticateToken)
export class ChapterController {
  service: ChapterService;

  constructor() {
    this.service = new ChapterService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Chapter>>) {
    const { total, lists } = await this.service.queryList(query);
    return { total, lists: lists.map(({ content: _, ...rest }) => rest) };
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    return this.service.queryOne(
      { id },
      {
        relations: ["book"],
      },
    );
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body({}) body: Chapter, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Chapter,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
