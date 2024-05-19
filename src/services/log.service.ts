import CrudService from "./base/crud.service";
import db from "../data-source";
import { Logger } from "../export";

const repository = db.getRepository(Logger);

export default class BookService extends CrudService<Logger> {
  constructor() {
    super(repository);
  }
}
