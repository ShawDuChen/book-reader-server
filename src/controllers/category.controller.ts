import {
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  Res,
  UseBefore,
} from "routing-controllers";
import { BookService, Category, CategoryService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/category")
@UseBefore(authenticateToken)
export class CategoryController extends BaseHelper<Category> {
  service: CategoryService;
  bookService: BookService;

  constructor() {
    super();
    this.service = new CategoryService();
    this.bookService = new BookService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Category>>) {
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
  async create(@Body() body: Category, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Category>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Category,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}

@JsonController("/api/category")
@UseBefore(authenticateToken)
export class ApiCategoryController extends CategoryController {
  constructor() {
    super();
  }

  @Get("/")
  async getAll(@QueryParams() { book_limit }: { book_limit?: number }) {
    const categorys = await this.service.getAll({
      relations: ["books"],
    });
    return categorys.map((item) => ({
      ...item,
      books: item.books?.slice(0, book_limit || 10),
    }));
  }

  @Get("/hot")
  async getHotList(@QueryParams() { limit }: { limit?: number }) {
    return this.service.random(limit || 20);
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    return this.service.queryOne(
      { id },
      {
        relations: ["books"],
      },
    );
  }

  @Get("/:id/books")
  async getBooks(@Param("id") id: number) {
    return this.bookService.getAll({
      where: {
        category_id: id,
      },
    });
  }
}
