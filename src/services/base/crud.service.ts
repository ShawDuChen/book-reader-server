import {
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { PageQuery } from "@/typing";
import { HttpError } from "routing-controllers";
import { Workbook } from "exceljs";
import { getMetaColumns } from "@/data-source";

interface CommonLiteral {
  id: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface CrudServiceProps extends ObjectLiteral, CommonLiteral {}

export default class CrudService<T extends CrudServiceProps> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async getAll(options?: FindManyOptions<T>) {
    const [lists] = await this.repository.findAndCount(options);
    return lists;
  }

  async queryList<U = null>(query: PageQuery<U>, options?: FindManyOptions<T>) {
    const { page, limit, ...rest } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;
    const [lists, total] = await this.repository.findAndCount({
      where: rest as unknown as FindOneOptions<unknown>["where"],
      skip,
      take,
      ...options,
    });
    return { total, lists };
  }

  async find(options?: FindManyOptions<T>) {
    const lists = await this.repository.find(options);
    return lists;
  }

  async queryOne(
    where: FindOneOptions<T>["where"],
    options?: FindOneOptions<T>,
  ) {
    const data = await this.repository.findOne({ where, ...options });
    return data || ({ message: "query data not exist!" } as unknown as T);
  }

  async create(data: T) {
    return this.repository.save(data);
  }

  async save(data: T) {
    return this.repository.save(data);
  }

  async update(id: number, data: T) {
    return this.repository.update(id, data);
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

  async export(body: Partial<T>) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const datas = await this.repository.find({ where: body });
    const columns = getMetaColumns(this.repository.target);
    worksheet.columns = columns.map((item) => {
      return {
        header: item.title,
        key: item.dataIndex,
        width: 20,
      };
    });
    datas.forEach((data) => {
      worksheet.addRow(data);
    });
    return workbook;
  }
}
