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
import { Dictionary, DictionaryService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/dictionary")
@UseBefore(authenticateToken)
export class DictionaryController extends BaseHelper<Dictionary> {
  service: DictionaryService;

  constructor() {
    super();
    this.service = new DictionaryService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Dictionary>>) {
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

  @Get("/:id/dict_data")
  async queryDictDataList(@Param("id") id: number) {
    return this.service.queryDictDataList(id);
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Dictionary, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Dictionary>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Dictionary,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}
