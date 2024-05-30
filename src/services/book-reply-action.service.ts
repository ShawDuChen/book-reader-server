import CrudService from "./base/crud.service";
import db from "@/data-source";
import { BookReplyAction } from "@/export";

const repository = db.getRepository(BookReplyAction);

export default class BookReplyActionService extends CrudService<BookReplyAction> {
  constructor() {
    super(repository);
  }
}
