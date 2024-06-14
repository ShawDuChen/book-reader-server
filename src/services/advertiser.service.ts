import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Advertiser } from "@/export";

const repository = db.getRepository(Advertiser);

export default class AdvertiserService extends CrudService<Advertiser> {
  constructor() {
    super(repository);
  }
}
