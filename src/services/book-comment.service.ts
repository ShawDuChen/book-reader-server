import CrudService from "./base/crud.service";
import db from "@/data-source";
import { BookComment } from "@/export";

const repository = db.getRepository(BookComment);

export default class BookCommentService extends CrudService<BookComment> {
  constructor() {
    super(repository);
  }
}
