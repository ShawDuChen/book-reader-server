import CrudService from "./base/crud.service";
import db from "../data-source";
import { Book } from "../export";

const repository = db.getRepository(Book);

export default class BookService extends CrudService<Book> {
  constructor() {
    super(repository);
  }
}
