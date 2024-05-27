import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DictionaryData } from "./dict-data.entity";
import CrudBaseEntity from "./tools/base-entity";

@Entity("dictionary")
export class Dictionary extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "字典名称" })
  name!: string;

  @Column({ type: "varchar", length: 255, comment: "字典标识符" })
  identify!: string;

  @Column({ type: "int", default: 1, comment: "状态" })
  status!: 1 | 0;

  @OneToMany(() => DictionaryData, (dict_data) => dict_data.dictionary)
  dict_data_list?: DictionaryData[];
}
