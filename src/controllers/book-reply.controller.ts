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
import { BookReply, BookReplyService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";
import { ActionType } from "../entities/book-reply-action.entity";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/book_reply")
@UseBefore(authenticateToken)
export class BookReplyController extends BaseHelper<BookReply> {
  service: BookReplyService;

  constructor() {
    super();
    this.service = new BookReplyService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<BookReply>>) {
    const { total, lists } = await this.service.queryList(query, {
      relations: ["comment", "user", "actions"],
    });
    return {
      total,
      lists: lists.map((item) => {
        const like_count =
          item.actions?.filter((action) => action.action === ActionType.LIKE)
            .length || 0;
        return {
          ...item,
          actions: undefined,
          like_count,
          dislike_count: (item.actions?.length || 0) - like_count,
        };
      }),
    };
  }

  @Get("/all")
  async quertAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const item = await this.service.queryOne(
      { id },
      {
        relations: ["comment", "user", "actions"],
      },
    );
    const like_count =
      item.actions?.filter((action) => action.action === ActionType.LIKE)
        .length || 0;
    const dislike_count = (item.actions?.length || 0) - like_count;
    return { ...item, actions: undefined, like_count, dislike_count };
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: BookReply, @CurrentUser() user: TokenUser) {
    return this.service.create({
      ...body,
      user_id: user.user_id,
      created_by: user.username,
    });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<BookReply>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: BookReply,
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
