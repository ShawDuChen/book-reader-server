import CrudService from "./base/crud.service";
import db from "../data-source";
import { Chapter } from "../entities/chapter.entity";

const repository = db.getRepository(Chapter);

export default class BookService extends CrudService<Chapter> {
  constructor() {
    super(repository);
  }
}
