import CrudService from "./base/crud.service";
import db from "../data-source";
import { Chapter } from "../export";
import { crawlChapterContent } from "../utils/crawl";

const repository = db.getRepository(Chapter);

export default class ChapterService extends CrudService<Chapter> {
  constructor() {
    super(repository);
  }

  async crawlChapter(id: number) {
    const chapter = await this.queryOne({ id });
    const content = await crawlChapterContent(chapter.url);
    chapter.content = content || "";
    await this.update(id, chapter);
    return chapter;
  }
}
