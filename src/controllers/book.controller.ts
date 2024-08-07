import {
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Delete,
  Get,
  HttpError,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  Res,
  UseBefore,
} from "routing-controllers";
import {
  BookService,
  Book,
  AuthorService,
  ChapterService,
  CrawlRuleService,
} from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
import BookMerger from "@/utils/book-merger";

@Controller("/book")
@UseBefore(authenticateToken)
export class BookController extends BaseHelper<Book> {
  service: BookService;
  authorService: AuthorService;
  chapterService: ChapterService;
  crawlRuleService: CrawlRuleService;

  constructor() {
    super();
    this.service = new BookService();
    this.authorService = new AuthorService();
    this.chapterService = new ChapterService();
    this.crawlRuleService = new CrawlRuleService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Book>>) {
    return this.service.queryList(query, {
      relations: ["category", "author", "crawl_rule"],
    });
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
        relations: ["category", "author", "crawl_rule"],
      },
    );
  }

  @Get("/:id/chapters")
  async queryChapters(@Param("id") id: number) {
    return this.service.queryChapters(id);
  }

  @Get("/:id/startCrawl")
  async startCrawl(@Param("id") id: number) {
    const book = await this.queryById(id);
    if (!book.fetch_url) {
      throw new HttpError(400, "请先设置抓取地址");
    }
    const chapterList = await this.service.startCrawl(book);
    for (let i = 0; i < chapterList.length; i++) {
      const { no, title, url } = chapterList[i];
      await this.chapterService.findOneOrCrate(
        {
          no,
          title,
          book_id: book.id,
        },
        { no, title, book_id: book.id, url },
      );
    }
    return { message: "success", total: chapterList.length, data: book };
  }

  @Get("/:id/comments")
  async queryComments(@Param("id") id: number) {
    const book = await this.service.queryOne(
      { id },
      { relations: ["comments"] },
    );
    return {
      total: book.comments?.length || 0,
      lists: book.comments || [],
    };
  }

  @Get("/:id/merge_book")
  async mergeBook(@Param("id") id: number) {
    const book = await this.queryById(id);
    const chapters = await this.queryChapters(id);
    const merger = new BookMerger(book, chapters);
    const url = await merger.start();
    return { message: "success", data: url };
  }

  @Get("/:id/crawl_chapter_content")
  async crawlContent(@Param("id") id: number) {
    try {
      const { data } = await this.startCrawl(id);
      const chapters = await this.service.queryChapters(id);
      for (const chapter of chapters) {
        // if (!chapter.content) {
        const content_selector = data?.crawl_rule_id
          ? await this.crawlRuleService
              .queryOne({ id: data.crawl_rule_id })
              .then((crawl_rule) => crawl_rule.content_selector)
          : "";
        await this.chapterService.crawlChapter(chapter, content_selector);
        // }
      }
      return { total: chapters.length };
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Book, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Book>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Book,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}

@JsonController("/api/book")
@UseBefore(authenticateToken)
export class ApiBookController extends BookController {
  constructor() {
    super();
  }

  @Get("/")
  async getAll() {
    return this.service.getAll();
  }

  @Get("/hot")
  async getHotList(@QueryParams() { limit }: { limit?: number }) {
    return this.service.random(limit || 20);
  }

  @Get("/:id")
  async getBookInfo(@Param("id") id: number) {
    return this.service.queryOne(
      { id },
      {
        relations: ["chapters", "author"],
      },
    );
  }

  @Get("/:id/chapters")
  async getBookChapters(@Param("id") id: number) {
    return this.queryChapters(id);
  }
}
