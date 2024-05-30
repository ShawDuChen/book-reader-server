import CrudService from "./base/crud.service";
import db from "@/data-source";
import { BookCommentAction } from "@/export";

const repository = db.getRepository(BookCommentAction);

export default class BookCommentActionService extends CrudService<BookCommentAction> {
  constructor() {
    super(repository);
  }
}
