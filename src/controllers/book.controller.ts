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
import { BookService, Book, AuthorService, ChapterService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";

@Controller("/book")
@UseBefore(authenticateToken)
export class BookController extends BaseHelper<Book> {
  service: BookService;
  authorService: AuthorService;
  chapterService: ChapterService;

  constructor() {
    super();
    this.service = new BookService();
    this.authorService = new AuthorService();
    this.chapterService = new ChapterService();
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
      return new HttpError(400, "请先设置抓取地址");
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
    return { message: "success", total: chapterList.length };
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
