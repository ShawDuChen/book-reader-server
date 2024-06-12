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
  async getAll() {
    return this.service.getAll({
      relations: ["books"],
    });
  }

  @Get("/hot")
  async getHotList() {
    const { lists } = await this.queryList({ page: 1, limit: 20 });
    return lists;
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
