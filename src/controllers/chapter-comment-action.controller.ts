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
import { ChapterCommentAction, ChapterCommentActionService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";

@Controller("/chapter_comment_action")
@UseBefore(authenticateToken)
export class ChapterCommentActionController {
  service: ChapterCommentActionService;

  constructor() {
    this.service = new ChapterCommentActionService();
  }

  @Get("/")
  async queryList(
    @QueryParams() query: PageQuery<Partial<ChapterCommentAction>>,
  ) {
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
    @Body() body: ChapterCommentAction,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.create({
      ...body,
      user_id: user.user_id,
      created_by: user.username,
    });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: ChapterCommentAction,
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
