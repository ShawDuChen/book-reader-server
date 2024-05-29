import CrudService from "./base/crud.service";
import db from "../data-source";
import { ChapterReply } from "../export";

const repository = db.getRepository(ChapterReply);

export default class ChapterReplyService extends CrudService<ChapterReply> {
  constructor() {
    super(repository);
  }
}
