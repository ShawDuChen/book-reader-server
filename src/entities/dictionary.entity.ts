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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  identify!: string;

  @Column({ type: "int", default: 1 })
  status!: 1 | 0;

  @Column({ type: "varchar", length: 255, nullable: true })
  remark?: string;

  @OneToMany(() => DictionaryData, (dict_data) => dict_data.dictionary)
  dict_data_list?: DictionaryData[];

  @CreateDateColumn({ type: "datetime", name: "created_at", nullable: true })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  updated_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  updated_by?: string;
}
