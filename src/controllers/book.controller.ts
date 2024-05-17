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
import BookService from "../services/book.service";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { Book } from "../entities/book.entity";

@Controller("/book")
export class BookController {
  service: BookService;

  constructor() {
    this.service = new BookService();
  }

  @Get("/")
  @UseBefore(authenticateToken)
  async queryList(@QueryParams() query: PageQuery<{ name?: string }>) {
    return this.service.queryList(query);
  }

  @Get("/:id")
  @UseBefore(authenticateToken)
  async queryById(@Param("id") id: number) {
    return this.service.queryOne({ id });
  }

  @Post("/")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  async create(@Body() body: Book, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @UseBefore(authenticateToken)
  @ContentType("application/json")
  async update(@Param("id") id: number, @Body() body: Book, @CurrentUser() user: TokenUser) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  @UseBefore(authenticateToken)
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
