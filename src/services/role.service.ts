import CrudService from "./base/crud.service";
import db from "../data-source";
import { Role } from "../export";
import { listToTree } from "../utils/tree";

const repository = db.getRepository(Role);

export default class RoleService extends CrudService<Role> {
  constructor() {
    super(repository);
  }

  async getRoleMenus(id: number) {
    const role = await this.queryOne({ id }, { relations: ["menus"] });
    return listToTree(role?.menus || []);
  }
}
