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
import { Response } from "express";
import { Author, AuthorService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";

@Controller("/author")
@UseBefore(authenticateToken)
export class AuthorController extends BaseHelper<Author> {
  service: AuthorService;
  constructor() {
    super();
    this.service = new AuthorService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Author>>) {
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

  @Get("/:author_id/books")
  async queryBooks(@Param("author_id") author_id: number) {
    return this.service.queryBooks(author_id);
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Author, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Author>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Author,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}

@JsonController("/api/author")
@UseBefore(authenticateToken)
export class ApiAuthorController extends AuthorController {
  constructor() {
    super();
  }

  @Get("/")
  async getAll() {
    return this.service.getAll();
  }
}
