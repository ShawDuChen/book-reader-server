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
import { BookComment, BookCommentService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";

@Controller("/book_comment")
@UseBefore(authenticateToken)
export class BookCommentController {
  service: BookCommentService;

  constructor() {
    this.service = new BookCommentService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<BookComment>>) {
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
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: BookComment,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
