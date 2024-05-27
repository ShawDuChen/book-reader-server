import CrudService from "./base/crud.service";
import db from "../data-source";
import { Book } from "../export";
import { crawlBookChapters } from "../utils/crawl";

const repository = db.getRepository(Book);

export default class BookService extends CrudService<Book> {
  constructor() {
    super(repository);
  }

  async queryChapters(id: number) {
    const result = await this.queryOne(
      {
        id,
      },
      {
        relations: ["chapters"],
      },
    );
    return result.id ? result.chapters || [] : result;
  }

  async startCrawl(info: Book) {
    return crawlBookChapters(info);
  }
}
