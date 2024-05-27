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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  value!: string;

  @Column({ type: "varchar", length: 255 })
  label!: string;

  @Column({ type: "int" })
  dict_type!: number;

  @ManyToOne(() => Dictionary)
  @JoinColumn({
    name: "dict_type",
    referencedColumnName: "id",
    foreignKeyConstraintName: "dict_type",
  })
  dictionary?: Dictionary;

  @Column({ type: "varchar", length: 1, nullable: true })
  status?: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  remark?: string;

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}
