import CrudService from "./base/crud.service";
import db from "@/data-source";
import { SiteFooter } from "@/export";

const repository = db.getRepository(SiteFooter);

export default class SiteFooterService extends CrudService<SiteFooter> {
  constructor() {
    super(repository);
  }
}
