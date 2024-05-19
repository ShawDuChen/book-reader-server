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
import { Logger, LoggerService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { PageQuery, TokenUser } from "../typing";

@Controller("/log")
@UseBefore(authenticateToken)
export class LoggerController {
  service: LoggerService;

  constructor() {
    this.service = new LoggerService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Logger>>) {
    return this.service.queryList(query);
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    return this.service.queryOne({ id });
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Logger, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Logger,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}