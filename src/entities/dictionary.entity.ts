import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "datetime", name: "created_at" })
  created_at!: string;

  @Column()
  created_by!: string;

  @Column({ type: "datetime", name: "updated_at" })
  updated_at!: string;

  @Column()
  updated_by!: string;
}
