import CrudService from "./base/crud.service";
import db from "@/data-source";
import { ChapterReplyAction } from "@/export";

const repository = db.getRepository(ChapterReplyAction);

export default class ChapterReplyActionService extends CrudService<ChapterReplyAction> {
  constructor() {
    super(repository);
  }
}
