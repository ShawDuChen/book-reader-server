import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Code } from "@/export";

const repository = db.getRepository(Code);

export default class BookService extends CrudService<Code> {
  constructor() {
    super(repository);
  }
}
