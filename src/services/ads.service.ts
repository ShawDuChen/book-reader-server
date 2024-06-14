import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Ads } from "@/export";

const repository = db.getRepository(Ads);

export default class AdsService extends CrudService<Ads> {
  constructor() {
    super(repository);
  }
}
