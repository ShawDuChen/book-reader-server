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
import { Menu } from "./entities/menu.entity";
import { BookComment } from "./entities/book-comment.entity";
import { BookReply } from "./entities/book-reply.entity";
import { BookCommentAction } from "./entities/book-comment-action.entity";
import { BookReplyAction } from "./entities/book-reply-action.entity";
import { ChapterComment } from "./entities/chapter-comment.entity";
import { ChapterReply } from "./entities/chapter-reply.entity";
import { ChapterCommentAction } from "./entities/chapter-comment-action.entity";
import { ChapterReplyAction } from "./entities/chapter-reply-action.entity";
import { Source } from "./entities/source.entity";
import { SiteFooter } from "./entities/footer.entity";
import { Advertiser } from "./entities/advertiser.entity";
import { Ads } from "./entities/ads.entity";

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
  Menu,
  BookComment,
  BookReply,
  BookCommentAction,
  BookReplyAction,
  ChapterComment,
  ChapterReply,
  ChapterCommentAction,
  ChapterReplyAction,
  Source,
  SiteFooter,
  Advertiser,
  Ads,
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
  menu: Menu,
  book_comment: BookComment,
  book_reply: BookReply,
  book_comment_action: BookCommentAction,
  book_reply_action: BookReplyAction,
  chapter_comment: ChapterComment,
  chapter_reply: ChapterReply,
  chapter_comment_action: ChapterCommentAction,
  chapter_reply_action: ChapterReplyAction,
  source: Source,
  site_footer: SiteFooter,
  advertiser: Advertiser,
  ads: Ads,
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
export { default as MenuService } from "./services/menu.service";
export { default as BookCommentService } from "./services/book-comment.service";
export { default as BookReplyService } from "./services/book-reply.service";
export { default as BookCommentActionService } from "./services/book-comment-action.service";
export { default as BookReplyActionService } from "./services/book-reply-action.service";
export { default as ChapterCommentService } from "./services/chapter-comment.service";
export { default as ChapterReplyService } from "./services/chapter-reply.service";
export { default as ChapterCommentActionService } from "./services/chapter-comment-action.service";
export { default as ChapterReplyActionService } from "./services/chapter-reply-action.service";
export { default as SourceService } from "./services/source.service";
export { default as SiteFooterService } from "./services/site-footer.service";
export { default as AdvertiserService } from "./services/advertiser.service";
export { default as AdsService } from "./services/ads.service";
