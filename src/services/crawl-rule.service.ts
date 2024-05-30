import CrudService from "./base/crud.service";
import db from "@/data-source";
import { CrawlRule } from "@/export";

const repository = db.getRepository(CrawlRule);

export default class CrawlRuleService extends CrudService<CrawlRule> {
  constructor() {
    super(repository);
  }
}
