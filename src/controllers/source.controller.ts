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
import { Source, SourceService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";

@Controller("/source")
@UseBefore(authenticateToken)
export class SourceController {
  service: SourceService;

  constructor() {
    this.service = new SourceService();
  }

  @Get("/")
  async queryList(
    @QueryParams() query: PageQuery<Partial<Source>>,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.queryList({ ...query, user_id: user.user_id });
  }

  @Get("/all")
  async quertAll(@CurrentUser() user: TokenUser) {
    return this.service.getAll({ where: { user_id: user.user_id } });
  }

  @Get("/:id")
  async queryById(@Param("id") id: number, @CurrentUser() user: TokenUser) {
    return this.service.queryOne({ id, user_id: user.user_id });
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Source, @CurrentUser() user: TokenUser) {
    return this.service.create({
      ...body,
      user_id: user.user_id,
      created_by: user.username,
    });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Source,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
