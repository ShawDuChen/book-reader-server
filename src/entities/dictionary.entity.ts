import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DictionaryData } from "./dict-data.entity";

@Entity("dictionary")
export class Dictionary {
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

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注" })
  remark?: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    nullable: true,
    comment: "创建日期",
  })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "创建人" })
  created_by?: string;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
    nullable: true,
    comment: "更新日期",
  })
  updated_at?: string;

  @Column({ type: "varchar", nullable: true, comment: "最后操作人" })
  updated_by?: string;
}
