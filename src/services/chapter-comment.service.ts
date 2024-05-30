import CrudService from "./base/crud.service";
import db from "@/data-source";
import { ChapterComment } from "@/export";

const repository = db.getRepository(ChapterComment);

export default class ChapterCommentService extends CrudService<ChapterComment> {
  constructor() {
    super(repository);
  }
}
