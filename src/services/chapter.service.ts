import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Chapter } from "@/export";
import { crawlChapterContent } from "../utils/crawl";

const repository = db.getRepository(Chapter);

export default class ChapterService extends CrudService<Chapter> {
  constructor() {
    super(repository);
  }

  async crawlChapter(chapter: Chapter, content_selector?: string) {
    const content = await crawlChapterContent(chapter.url, content_selector);
    const newChapter = { ...chapter, content: content || "" };
    await this.update(chapter.id, newChapter);
    return newChapter;
  }
}
