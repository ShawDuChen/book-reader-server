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
import { CrawlRule, CrawlRuleService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";

@Controller("/crawl_rule")
@UseBefore(authenticateToken)
export class CrawlRuleController {
  service: CrawlRuleService;

  constructor() {
    this.service = new CrawlRuleService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<CrawlRule>>) {
    return this.service.queryList(query);
  }

  @Get("/all")
  async quertAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    return this.service.queryOne(
      { id },
      {
        relations: ["books"],
      },
    );
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: CrawlRule, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: CrawlRule,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
