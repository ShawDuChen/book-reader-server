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
  UseBefore,
} from "routing-controllers";
import { SiteFooter, SiteFooterService } from "@/export";
import { authenticateToken } from "@/middlewares/jwt";
import { PageQuery, TokenUser } from "@/typing";
import { SiteFooterType } from "@/entities/footer.entity";

@Controller("/site_footer")
@UseBefore(authenticateToken)
export class SiteFooterController {
  service: SiteFooterService;

  constructor() {
    this.service = new SiteFooterService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<SiteFooter>>) {
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
  async create(@Body() body: SiteFooter, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: SiteFooter,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }
}

@JsonController("/api/site_footer")
export class ApiSiteFooterController extends SiteFooterController {
  constructor() {
    super();
  }

  @Get("/info")
  async info() {
    const all = await this.quertAll();
    const about = all.find((item) => item.type === SiteFooterType.ABOUT) || {};
    const contacts = all.filter((item) => item.type === SiteFooterType.CONTACT);
    const news = all.filter((item) => item.type === SiteFooterType.NEWS);
    const socials = all.filter((item) => item.type === SiteFooterType.SOCIAL);

    return {
      about,
      contacts,
      socials,
      news: this.categoryWithSubType(news),
    };
  }

  categoryWithSubType(list: SiteFooter[]) {
    const map: Map<string, SiteFooter[]> = new Map();
    list.forEach((item) => {
      if (!map.has(item.sub_type!)) {
        map.set(item.sub_type!, []);
      }
      map.get(item.sub_type!)!.push(item);
    });
    return Array.from(map).map(([key, value]) => {
      return {
        type: key,
        list: value,
      };
    });
  }
}
