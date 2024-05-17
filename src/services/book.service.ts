import CrudService from "./base/crud.service";
import db from "../data-source";
import { Book } from "../entities/book.entity";

const bookRepository = db.getRepository(Book);

export default class BookService extends CrudService<Book> {
  constructor() {
    super(bookRepository);
  }
}
