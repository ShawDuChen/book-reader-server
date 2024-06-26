import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Category } from "@/export";

const repository = db.getRepository(Category);

export default class CategoryService extends CrudService<Category> {
  constructor() {
    super(repository);
  }
}
