import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Dictionary } from "./dictionary.entity";

@Entity("dict_data")
export class DictionaryData {
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
