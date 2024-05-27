import { EntityTarget } from "typeorm";

// Validator
export { userValidator } from "./validators/user.validator";

// Entities
import { Book } from "./entities/book.entity";
import { Chapter } from "./entities/chapter.entity";
import { User } from "./entities/user.entity";
import { Logger } from "./entities/log.entity";
import { Role } from "./entities/role.entity";
import { Category } from "./entities/category.entity";
import { Dictionary } from "./entities/dictionary.entity";
import { DictionaryData } from "./entities/dict-data.entity";
import { Author } from "./entities/author.entity";
import { Code } from "./entities/code.entity";
import { CrawlRule } from "./entities/crawl-rule.entity";

export {
  Book,
  Chapter,
  User,
  Logger,
  Role,
  Category,
  Dictionary,
  DictionaryData,
  Author,
  Code,
  CrawlRule,
};

export const EntitiesMap: Record<string, EntityTarget<unknown>> = {
  book: Book,
  chapter: Chapter,
  user: User,
  logger: Logger,
  role: Role,
  category: Category,
  dictionary: Dictionary,
  dict_data: DictionaryData,
  author: Author,
  code: Code,
  crawl_rule: CrawlRule,
};

// Services
export { default as BookService } from "./services/book.service";
export { default as ChapterService } from "./services/chapter.service";
export { default as UserService } from "./services/user.service";
export { default as RoleService } from "./services/role.service";
export { default as CategoryService } from "./services/category.service";
export { default as LoggerService } from "./services/log.service";
export { default as DictionaryService } from "./services/dictionary.service";
export { default as DictionaryDataService } from "./services/dict-data.service";
export { default as AuthorService } from "./services/author.service";
export { default as CodeService } from "./services/code.service";
export { default as CrawlRuleService } from "./services/crawl-rule.service";

// Controllers
export { BookController } from "./controllers/book.controller";
export { ChapterController } from "./controllers/chapter.controller";
export { LoginController } from "./controllers/login.controller";
export { UserController } from "./controllers/user.controller";
export { RoleController } from "./controllers/role.controller";
export { DictionaryController } from "./controllers/dictionary.controller";
export { DictionaryDataController } from "./controllers/dict-data.controller";
export { AuthorController } from "./controllers/author.controller";
export { CodeController } from "./controllers/code.controller";
