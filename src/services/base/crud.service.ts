import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import { PageQuery } from "../../typing";
import { now } from "../../utils/time";

interface CommonLiteral {
  id: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

interface CrudServiceProps extends ObjectLiteral, CommonLiteral {}

export default class CrudService<T extends CrudServiceProps> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async queryList<T = null>(query: PageQuery<T>) {
    let { page, limit, ...rest } = query;
    page = page || 1;
    const take = limit || 10;
    const skip = (page - 1) * take;
    const [lists, total] = await this.repository.findAndCount({
      where: rest as any,
      skip,
      take,
    });
    return { total, lists };
  }

  async queryOne(where: FindOneOptions<T>["where"]) {
    const data = await this.repository.findOne({ where });
    return data || ({message: 'unexist'} as unknown as T)
  }

  async create(data: T) {
    const created_at = now();
    return this.repository.save({ ...data, created_at });
  }

  async update(id: number, data: T) {
    const updated_at = now();
    return this.repository.update(id, { ...data, updated_at });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
