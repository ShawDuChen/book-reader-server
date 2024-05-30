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
import { BookCommentAction, BookCommentActionService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";

@Controller("/book_comment_action")
@UseBefore(authenticateToken)
export class BookCommentActionController extends BaseHelper<BookCommentAction> {
  service: BookCommentActionService;

  constructor() {
    super();
    this.service = new BookCommentActionService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<BookCommentAction>>) {
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
  async create(
    @Body() body: BookCommentAction,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.create({
      ...body,
      user_id: user.user_id,
      created_by: user.username,
    });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(
    @Res() res: Response,
    @Body() body: Partial<BookCommentAction>,
  ) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: BookCommentAction,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, {
      ...body,
      user_id: user.user_id,
      updated_by: user.username,
    });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
