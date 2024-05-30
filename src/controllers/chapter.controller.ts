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
import { ChapterService, Chapter, CrawlRuleService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/chapter")
@UseBefore(authenticateToken)
export class ChapterController extends BaseHelper<Chapter> {
  service: ChapterService;
  crawlRuleService: CrawlRuleService;
  constructor() {
    super();
    this.service = new ChapterService();
    this.crawlRuleService = new CrawlRuleService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Chapter>>) {
    const { total, lists } = await this.service.queryList(query, {
      relations: ["book"],
    });
    return { total, lists: lists.map(({ content: _, ...rest }) => rest) };
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
        relations: ["book"],
      },
    );
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body({}) body: Chapter, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Chapter>) {
    return this.export(this.service, res, body);
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

  @Get("/:id/crawl")
  async crawlChapter(@Param("id") id: number) {
    const chapter = await this.service.queryOne(
      { id },
      { relations: ["book"] },
    );
    const content_selector = chapter.book?.crawl_rule_id
      ? await this.crawlRuleService
          .queryOne({ id: chapter.book.crawl_rule_id })
          .then((crawl_rule) => crawl_rule.content_selector)
      : "";
    return this.service.crawlChapter(chapter, content_selector);
  }
}
