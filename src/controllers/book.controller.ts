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
import { BookService, Book, AuthorService, ChapterService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { CrawlInfo, PageQuery, TokenUser } from "../typing";

@Controller("/book")
@UseBefore(authenticateToken)
export class BookController {
  service: BookService;
  authorService: AuthorService;
  chapterService: ChapterService;

  constructor() {
    this.service = new BookService();
    this.authorService = new AuthorService();
    this.chapterService = new ChapterService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Book>>) {
    return this.service.queryList(query, {
      relations: ["category", "author"],
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
        relations: ["category", "author"],
      },
    );
  }

  @Get("/:id/chapters")
  async queryChapters(@Param("id") id: number) {
    return this.service.queryChapters(id);
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Book, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
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

  @Post("/crawl")
  @ContentType("application/json")
  async crawlBook(@Body() body: CrawlInfo) {
    const author = await this.authorService.findOneOrCrate(
      { name: body.author_name },
      { name: body.author_name },
    );

    const book = await this.service.findOneOrCrate(
      { name: body.book_name },
      { name: body.book_name, author_id: author.id, fetch_url: body.fetch_url },
    );
    const chapterList = await this.service.startCrawl(body);
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
}
