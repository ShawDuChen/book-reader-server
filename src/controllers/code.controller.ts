import {
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Delete,
  Get,
  NotFoundError,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from "routing-controllers";
import { Code, CodeService } from "../export";
import { authenticateToken } from "../middlewares/jwt";
import { CodeColumn, PageQuery, TokenUser } from "../typing";
import CodeGenerator from "../utils/code-generator";

@Controller("/code")
@UseBefore(authenticateToken)
export class CodeController {
  service: CodeService;

  constructor() {
    this.service = new CodeService();
  }

  @Get("/")
  async queryList(@QueryParams() query: PageQuery<Partial<Code>>) {
    const { total, lists } = await this.service.queryList(query);
    return {
      total,
      lists: lists.map((item) => {
        return {
          ...item,
          columns: (item.columns && JSON.parse(item.columns)) as CodeColumn[],
        };
      }),
    };
  }

  @Get("/:id")
  async queryById(@Param("id") id: number) {
    const result = await this.service.queryOne({ id });
    return result.id
      ? {
          ...result,
          columns: (result.columns &&
            JSON.parse(result.columns)) as CodeColumn[],
        }
      : result;
  }

  @Post("/")
  @ContentType("application/json")
  async create(@Body() body: Code, @CurrentUser() user: TokenUser) {
    return this.service.create({ ...body, created_by: user.username });
  }

  @Put("/:id")
  @ContentType("application/json")
  async update(
    @Param("id") id: number,
    @Body() body: Code,
    @CurrentUser() user: TokenUser,
  ) {
    return this.service.update(id, { ...body, updated_by: user.username });
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.service.delete(id);
  }

  @Get("/:id/generate")
  async generate(@Param("id") id: number) {
    const data = await this.queryById(id);
    if (!data.id) throw new NotFoundError();
    const codeGenerator = new CodeGenerator(data.name, data.columns);
    return codeGenerator.getCode();
  }
}