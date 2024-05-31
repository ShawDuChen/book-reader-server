import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Menu } from "@/export";
import { listToTree } from "@/utils/tree";

const repository = db.getRepository(Menu);

export default class MenuService extends CrudService<Menu> {
  constructor() {
    super(repository);
  }

  async menuTree() {
    const menu = await this.getAll();
    return listToTree(menu);
  }
}
