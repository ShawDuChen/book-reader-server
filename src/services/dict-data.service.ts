import CrudService from "./base/crud.service";
import db from "@/data-source";
import { DictionaryData } from "@/export";

const repository = db.getRepository(DictionaryData);

export default class DictionaryDataService extends CrudService<DictionaryData> {
  constructor() {
    super(repository);
  }

  async getByType(dict_type: number) {
    const list = await this.repository.find({
      where: {
        dict_type,
      },
    });
    return list;
  }
}
