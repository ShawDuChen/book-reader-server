import CrudService from "./base/crud.service";
import db from "@/data-source";
import { Dictionary } from "@/export";

const repository = db.getRepository(Dictionary);

export default class DictionaryService extends CrudService<Dictionary> {
  constructor() {
    super(repository);
  }

  async queryDictDataList(id: number) {
    const result = await this.queryOne(
      { id },
      {
        relations: ["dict_data_list"],
      },
    );
    return result.id ? result.dict_data_list || [] : result;
  }
}
