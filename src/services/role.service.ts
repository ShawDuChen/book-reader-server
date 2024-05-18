import CrudService from "./base/crud.service";
import db from "../data-source";
import { Role } from "../export";

const repository = db.getRepository(Role);

export default class BookService extends CrudService<Role> {
  constructor() {
    super(repository);
  }
}
