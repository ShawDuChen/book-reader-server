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
import { BookComment, BookCommentService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import { ActionType } from "@/entities/book-comment-action.entity";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/book_comment")
@UseBefore(authenticateToken)
export class BookCommentController extends BaseHelper<BookComment> {
  service: BookCommentService;

  constructor() {
    super();
    this.service = new BookCommentService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<BookComment>>) {
    const { total, lists } = await this.service.queryList(query, {
      relations: ["book", "user", "actions"],
    });
    return {
      total,
      lists: lists.map((item) => {
        const like_count =
          item.actions?.filter((act) => act.action === ActionType.LIKE)
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
    const comment = await this.service.queryOne(
      { id },
      {
        relations: ["book", "user", "actions"],
      },
    );
    const like_count =
      comment.actions?.filter((act) => act.action === ActionType.LIKE).length ||
      0;
    return {
      ...comment,
      actions: undefined,
      like_count,
      dislike_count: (comment.actions?.length || 0) - like_count,
    };
  }

  @Get("/:id/replies")
  async queryReplies(@Param("id") id: number) {
    const comment = await this.service.queryOne(
      { id },
      {
        relations: ["replies"],
      },
    );
    return {
      total: comment.replies?.length || 0,
      lists: comment.replies || [],
    };
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: BookComment, @CurrentUser() user: TokenUser) {
    return this.service.create({
      ...body,
      user_id: user.user_id,
      created_by: user.username,
    });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<BookComment>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: BookComment,
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
