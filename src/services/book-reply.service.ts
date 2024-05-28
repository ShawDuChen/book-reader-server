import CrudService from "./base/crud.service";
import db from "../data-source";
import { BookReply } from "../export";

const repository = db.getRepository(BookReply);

export default class BookReplyService extends CrudService<BookReply> {
  constructor() {
    super(repository);
  }
}
