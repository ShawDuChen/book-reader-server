import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dict_data")
export class DictionaryData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: string;

  @Column()
  label!: string;

  @Column()
  dict_type!: number;

  @Column()
  status?: number;

  @Column()
  remark?: string;

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}
