import CrudService from "./base/crud.service";
import db from "@/data-source";
import { ChapterCommentAction } from "@/export";

const repository = db.getRepository(ChapterCommentAction);

export default class ChapterCommentActionService extends CrudService<ChapterCommentAction> {
  constructor() {
    super(repository);
  }
}
