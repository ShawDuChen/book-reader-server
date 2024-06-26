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
import { Ads, AdsService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import BaseHelper from "./base/helper";

@Controller("/ads")
@UseBefore(authenticateToken)
export class AdsController extends BaseHelper<Ads> {
  service: AdsService;

  constructor() {
    super();
    this.service = new AdsService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Ads>>) {
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
  async create(@Body() body: Ads, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }
  @Post("/export")
  @ContentType("application/json")
  async exportExcel(@Res() res: Response, @Body() body: Partial<Ads>) {
    return this.export(this.service, res, body);
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Ads,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}

@JsonController("/api/ads")
@UseBefore(authenticateToken)
export class ApiAdsController extends AdsController {
  constructor() {
    super();
  }

  @Get()
  async getAll() {
    const data = await this.service.getAll();
    return data.filter((item) => {
      return (
        item.status === 1 &&
        item.expired_at &&
        new Date(item.expired_at).getTime() > Date.now()
      );
    });
  }
}
