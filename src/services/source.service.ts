import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Source } from "@/export";

const repository = db.getRepository(Source);

export default class SourceService extends CrudService<Source> {
  constructor() {
    super(repository);
  }
}
