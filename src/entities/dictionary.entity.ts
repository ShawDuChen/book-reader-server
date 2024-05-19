import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DictionaryData } from "./dict-data.entity";

@Entity("dictionary")
export class Dictionary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  identify!: string;

  @Column()
  status!: 1 | 0;

  @Column()
  remark?: string;

  @OneToMany(() => DictionaryData, (dict_data) => dict_data.dictionary)
  dict_data_list?: DictionaryData[];

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}
