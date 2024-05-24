import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import { PageQuery } from "../../typing";
import { now } from "../../utils/time";
import { HttpError } from "routing-controllers";

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

  async getAll() {
    const [lists] = await this.repository.findAndCount();
    return lists;
  }

  async queryList<T = null>(query: PageQuery<T>) {
    const { page, limit, ...rest } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;
    const [lists, total] = await this.repository.findAndCount({
      where: rest as unknown as FindOneOptions<unknown>["where"],
      skip,
      take,
    });
    return { total, lists };
  }

  async queryOne(
    where: FindOneOptions<T>["where"],
    options?: FindOneOptions<T>,
  ) {
    const data = await this.repository.findOne({ where, ...options });
    return data || ({ message: "query data not exist!" } as unknown as T);
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

  async findOneOrCrate(where: Partial<T>, data: Partial<T>) {
    try {
      const found = await this.repository.findOneBy(where);
      if (found) {
        return found;
      } else {
        const newData = this.repository.create(data as T);
        return await this.repository.save(newData);
      }
    } catch (e: unknown) {
      throw new HttpError(400);
    }
  }
}
