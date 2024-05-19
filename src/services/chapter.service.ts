import CrudService from "./base/crud.service";
import db from "../data-source";
import { Chapter } from "../export";

const repository = db.getRepository(Chapter);

export default class ChapterService extends CrudService<Chapter> {
  constructor() {
    super(repository);
  }
}
