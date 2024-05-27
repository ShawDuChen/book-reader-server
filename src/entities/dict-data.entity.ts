import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dictionary } from "./dictionary.entity";
import CrudBaseEntity from "./tools/base-entity";

@Entity("dict_data")
export class DictionaryData extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "字典value值" })
  value!: string;

  @Column({ type: "varchar", length: 255, comment: "字典label值" })
  label!: string;

  @Column({ type: "int", comment: "所属字典" })
  dict_type!: number;

  @ManyToOne(() => Dictionary)
  @JoinColumn({
    name: "dict_type",
    referencedColumnName: "id",
    foreignKeyConstraintName: "dict_type",
  })
  dictionary?: Dictionary;

  @Column({ type: "varchar", length: 1, nullable: true, comment: "状态" })
  status?: number;
}
