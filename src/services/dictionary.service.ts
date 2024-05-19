import CrudService from "./base/crud.service";
import db from "../data-source";
import { Dictionary } from "../export";

const repository = db.getRepository(Dictionary);

export default class DictionaryService extends CrudService<Dictionary> {
  constructor() {
    super(repository);
  }
}
