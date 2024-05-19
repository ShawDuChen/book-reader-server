import CrudService from "./base/crud.service";
import db from "../data-source";
import { Author } from "../export";

const repository = db.getRepository(Author);

export default class AuthorService extends CrudService<Author> {
  constructor() {
    super(repository);
  }
}
