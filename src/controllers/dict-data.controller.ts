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
import { DictionaryData, DictionaryDataService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";
import { Response } from "express";
@Controller("/dict_data")
@UseBefore(authenticateToken)
export class DictionaryDataController extends BaseHelper<DictionaryData> {
  service: DictionaryDataService;

  constructor() {
    super();
    this.service = new DictionaryDataService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<DictionaryData>>) {
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
  async create(@Body() body: DictionaryData, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Post("/export")
  @ContentType("application/json")
  async exportExcel(
    @Res() res: Response,
    @Body() body: Partial<DictionaryData>,
  ) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: DictionaryData,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }

  @Get("/dict_type/:dict_type")
  async getByType(@Param("dict_type") dict_type: number) {
    return this.service.getByType(dict_type);
  }
}
