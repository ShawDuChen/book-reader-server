import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Menu } from "@/export";

const repository = db.getRepository(Menu);

export default class MenuService extends CrudService<Menu> {
  constructor() {
    super(repository);
  }
}
