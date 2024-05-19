import CrudService from "./base/crud.service";
import db from "../data-source";
import { DictionaryData } from "../export";

const repository = db.getRepository(DictionaryData);

export default class DictionaryDataService extends CrudService<DictionaryData> {
  constructor() {
    super(repository);
  }
}
